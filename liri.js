// this will connect to my .env page
require ("dotenv").config();

// this will connect the request module
var request = require("request");

// then I also pull the module for file sharing
var fs  = require("fs");

// then I pull in the keys from the keys.js file
var keys = require("./keys.js");

// I'm totally new to Spotify, so I'm not sure how this all comes together
var Spotify = require("node-spotify-api");

// I think twitter is a fast way to make a fool of myself so I typically keep my mouth shut...
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var twit = new Twitter(keys.twitter);

// this is where I should store the inputs as empty to be changed later
var dataArray = [];
var firstInput = false;
var secondInput = "";

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
        
    }
}




// this next part should be where Liri takes in: my-tweets
function flockOfTweets() {
    var twit = new Twitter(keys.twitter)
}


begin(firstInput, secondInput);