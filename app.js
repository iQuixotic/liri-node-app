
require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

// twitter npm
var twitter = require('twitter');

// Spotify npm
var spotify = require('node-spotify-api');

//keys npm 
var keys = require('./keys');

// for reading and writing
var fs = require('fs');

// request npm
var request = require('request');

let userInput=process.argv[2];

caseTime();

function caseTime() {
switch(userInput) {
    case 'my-tweets':
        getMyTweets();
        break;
    case 'spotify-this-song':
        spotifyLookUp();
        break;
    case 'movie-this':
        getMovie();
        break;
    case 'do-what-it-says':
        doIt();
        break;
    default:
    def(); 
}
}

function getMyTweets () {
    console.log('these are your tweets: la-de-da');
    console.log(keys.twitter);

    let client = new twitter(keys.twitter);
    let params = {screen_name: 'forTesting721'};
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets[1].text);
            for(i=0; i<tweets.length; i++){
            console.log(tweets[i].text + console.log(''));
            }         
        }
    });
}

function spotifyLookUp() {
    console.log('I have looked up your song on spotify');

    let songName = "";
    let songLookup = process.argv;

    // i want to create a way to take in multiple-word song titles
    for (let i = 3; i < songLookup.length; i++) {
        if (i > 3 && i < songLookup.length) {
            songName = songName + "+" + songLookup[i];
        }
        else {
            songName += songLookup[i];
        }
    }
    //default to the Ace of Base
    if (songName === "") {
        songName = 'The Sign Ace of Base';
        console.log(songName);
        console.log('If you havent listened to "The Sign" then try that.');
    
}

    let spot = new spotify(keys.spotify);
    
   
        spot.search({ type: 'track', query: songName }, function (err, data) {
            console.log('Song Name: ' + (data).tracks.items[0].name);
            console.log('Artists: ' + (data).tracks.items[0].artists[0].name);
            console.log('Link to song preview: ' + (data).tracks.items[0].preview_url);
            console.log('Album: ' + (data).tracks.items[0].album.name);
        });
    }


// for when user response is movie-this -- takes another input of movie name
function getMovie() {

    // initialize and define movie-Name as a string and titleLookup to be the array of inputs
    let movieName = "";
    let titleLookup = process.argv;
    
    for (let i = 3; i < titleLookup.length; i++) {
        if (i > 3 && i < titleLookup.length) {
          movieName = movieName + "+" + titleLookup[i];
        }
        else {
          movieName += titleLookup[i];
        }
      }

    // trilogy key must go after if/else so that movieName has been re-defined, but before requst
    let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function (error, response, body) {

        // let movieName = process.argv[3];
      
        console.log('');
        // console.log(movieName);
        // console.log(queryUrl);
        if (movieName === undefined) {
            console.log('If you havent watched "Mr. Nobody," then you should:' + ' http://www.imdb.com/title/tt0485947/');

            // if everything is working correctly and the movie title exists inside the data-base, return these values
        } else if (!error && response.statusCode === 200) {
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Rated: " + JSON.parse(body).Rated);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country of Origin: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Famous Actors: " + JSON.parse(body).Actors);
            console.log("Box Office: " + JSON.parse(body).BoxOffice);
        }
    });
}

function doIt() {

    fs.readFile("do-it.txt", "utf8", function(error, data) {

  
        if (error) {
          return console.log(error);
        }

        let dataArr = data.split(",");
        process.argv[0]='node';
        process.argv[1]='app.js';
        process.argv[2] =  dataArr[0];
        process.argv[3] =  dataArr[1];

        userInput=process.argv[2];
       
        caseTime();
    });
}

function def() {
    console.log('this is the default option');
}