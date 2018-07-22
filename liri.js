// this will connect to my .env page
require ("dotenv").config();

// this will connect the request module
var request = require("request");

// then I also pull the module for file sharing
var fs  = require("fs");

// so I can try to use the new object literal
var ES6 = require("es6-shim");

// then I pull in the keys from the keys.js file
var keys = require("./keys.js");

// this is to connect the log file
// var log = require("./log.txt");

// I'm totally new to Spotify, so I'm not sure how this all comes together
var Spotify = require("node-spotify-api");

// I think twitter is a fast way to make a fool of myself so I typically keep my mouth shut...
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var twit = new Twitter(keys.twitter);

console.log("the requires are done");
// this is where I should store the inputs as empty to be changed later
var dataArray = [];
var firstInput = false;
var secondInput = "";
var nodeArgv = process.argv;
var firstInput = process.argv[2];
// var secondInput = process.argv[3];
// does this next one need to be split?
var secondInput = process.argv.splice(3).join("");

var seperated = "+++++++++++++++++++++++";

// is it better to have this stand alone to be called?
function err () {
    console.log("it's not quite right" + err);
}


// how to get the writing to a log.txt
var addToLog = function(data) {
    fs.appendFile("log.txt", data + "\n", err);
};



// This is what will determine what is being asked for in the first input:
function begin(firstInput, secondInput) {
    switch (firstInput) {
        case "my-tweets":flockOfTweets(secondInput);
        break;

        case "spotify-this-song":musicSpot(secondInput);
        break;

        case "movie-this":cinemaInfo(secondInput);
        break;

        case "do-what-it-says": random();
        break;

        default: console.log("What do you want Liri to get? \n my-tweets \n spotify-this-song \n movie-this \n do-what-it-says");
        
    }
}


// this next part should be where Liri takes in: my-tweets
function flockOfTweets() {
    var twit = new Twitter(keys.twitter);
        var parameters = {
            screen_name: "GirthTanin", count: 20
        };
        twit.get("statuses/user_timeline", parameters, function(err, tweets, response) {
            if (err) {
                console.log("tweets");
                console.log("tweets.text");
            }
            var tweetedWhen = "";
            var tweet = "";
            for (var i = 0; i < tweets.length; i++) {
                tweetedWhen = tweets[i].created_at;
                tweet = tweets[i].text;
                // JShint is saying ES6 might not work...
            var logTweet = `\n${seperated}${tweetedWhen}\n${tweet}\n${seperated}\n`;
            console.log(logTweet);
            addToLog(logTweet);
            }
        });
}

// this next part should be where Liri gathers in: spotify-this-song
function musicSpot (s) {
    noQuery = process.argv[3];
    if (s === secondInput) {
        noQuery = s;
    }
    else if (noQuery === undefined) {
        // what is the default for this? "The Sign"
        noQuery = "The Sign Ace of Base";
    }

    function musicSpot (secondInput) {
        var songTitle = secondInput;
        spotify.search({
            type: "track",
            query: "query"
            }, 
            function (err, data) {
                if (err) {
                    console.log("Spotify error occurred " + err);
                    console.log(err.data);
                if (noQuery) {
                    var songInfo = data.tracks.items[0];
                    var artistName = JSON.stringify(songInfo.artists[0].name);
                    var songName = JSON.stringify(songInfo.name);
                    var albumName = JSON.stringify(songInfo.album.name);
                    var trackUrl = JSON.stringify(songInfo.external_urls.spotify);
                    var logSong = `\n ${seperated} \n Musician is: ${artistName} \n Title is: ${songName} \n Album Title is: ${albumName} \n Song link: ${trackUrl} \n ${seperated} \n`;
                    console.log (logSong);
                    addToLog (logSong);
                    }
                }
            });
        }
    }

    // This will be the OMDb part, starting with the default choice
    function cinemaInfo () {
        var movie = process.argv[3];
        if (movie === undefined) {
            movie = "Dancer in the Dark";
            console.log ("Bjork!");
            console.log (seperated);
            }
// This one is different (easier?) than the others, but my brain isn't quite dancing with it. 
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=shor&apikey=trilogy"; {
            request(queryURL, function (error, response, body) {
                if (error) {
                    return console.log("Movie melted " + error);
                    }
                var movieBuff = JSON.parse(body);
                var title = movieBuff.Title;
                var year = movieBuff.Year;
                var imdbRating = movieBuff.Ratings[0].Value;
                var rottenRating = movieBuff.Ratings[1].Value;
                var country = movieBuff.Country;
                var lang = movieBuff.Language;
                var plot = movieBuff.Plot;
                var actors = movieBuff.Actors;
                var logMovie = (`\n ${seperated} \n  Title: ${title} \n Movie Release: ${year} \n IMDB rating: ${imdbRating} \n Rotten Tomatoes rating: ${rottenRating} \n Country: ${country} \n Language: ${lang} \n Plot: ${plot} \n Actors: ${actors} \n ${seperated}`);

                console.log(logMovie);
                addToLog(logMovie);

                }
            );
        }
    }

    // this is supposed to do the random part.
    function random() {
        fs.readFile("random.txt", "utf8", function(err, data) {
            if (err) {
                console.log("the random file isn't working " + err);
            }
            dataArray = data.split(",");
            console.log(dataArray);
            begin("dataArray");
        });
    }
    
// this starts it all
begin(firstInput, secondInput);