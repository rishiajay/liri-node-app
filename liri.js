var fs = require("fs");
require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var action = process.argv[2];

var thesongname = process.argv[3];
//console.log("thesongname=" + thesongname);


//var Spotify = require('node-spotify-api');

var Spotify = require('node-spotify-api');  // tk




var movieName = process.argv.slice(3).join(" ");


switch (action) {
  case "concert-this":
    concertThis(action);
    break;

  // need help on using the search for spotify
  case "spotify-this-song":
    myspotify();
    break;

  case "movie-this":
    movie(movieName);
    break;

  case "do-what-it-says":
    doItFunction();
    break;

  default:
    console.log("Error: Invalid liri command: " + action);
    return;
}

// need help on using Axios for BandsInTown
function concertThis(concert) {
  console.log("concert " + concert);
  axios.get('https://rest.bandsintown.com/artists/events?app_id=codingbootcamp')
    .then(function (response) {
      // handle success
      console.log(response);
    })
}




// need help on OMDB API

function movie(movieName) {
  console.log("Movie: " + movieName);
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  console.log(queryUrl);
  axios.get(queryUrl).then(
    function (response) {
      console.log("Release Year: " + response.data.Year);
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

}

function doWhatItSays(doWhatItSays) {
  console.log("Do what it says" + doWhatItSays);
}



function myspotify() {


  var spotify = new Spotify({
    "id": "f185eccac4a54e4ca0e7e9932bcebbcf",
    "secret": "c27587d0193443fc9545ccaa519894db"
  });


  // query for the songname called something 
  //spotify.search({ type: 'track', query: 'something' }, function(err, data) {

  spotify.search({ type: 'track', query: thesongname }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    //console.log(data.tracks.items[0].album.artists[0].name);

    // console.log("\n***************************************\n");
    // // first item in the array
    // console.log(data.tracks.items[0].album); 


    // console.log("\n***************************************\n");
    // //first item in the array - display the artists name
    // console.log("artist name: " + data.tracks.items[0].album.artists[0].name); 



    // console.log("\n***************************************\n");
    // //loop item in the array - display the artists name

    for (var i = 0; i < data.tracks.items.length; i++) {

      console.log((i + 1) + ":  artist name: " + data.tracks.items[i].album.artists[0].name);
    }


  });



}


function doItFunction() {
  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    console.log(dataArr);

  });
}
