
var fs = require("fs");
require("dotenv").config();

var axios = require("axios");

var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Spotify = new Spotify(keys.Spotify);
var movieName = process.argv.slice(3).join(" ");

// const axios = require("axios");

// take 2 arguments
var targetAPI = process.argv[2];
var searchFor = process.argv[3];

// Switch will get the API to run
switch (targetAPI) {
  case "concert-this":
    concertThis();
    break;

  // need help on using the search for spotify
  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}

// need help on using Axios for BandsInTown
function concertThis() {

  var queryURL = "https://rest.bandsintown.com/artists/" + searchFor + "/events?app_id=codingbootcamp";
  axios.get(queryURL)
    .then(function (response) {
      console.log(response)
      // handle success
      for (var i = 0; i < response.data.length; i++) {
        var eventDate = response.data[i].datetime;
        console.log("------------------------------------");
        console.log("Venue Name: " + response.data[i].venue.name);
        console.log("Venue Location: " + response.data[i].venue.city);
        console.log("Event Date: " + response.data[i].eventDate);
        console.log("------------------------------------");
      };
    })
    .catch(function (error) {
      console.log(error);
    });
}

function Spotify(spotify) {

  searchArr = { type: "track", query: searchFor, limit: 3 }
  console.log(data)

  console.log("Spotify: " + spotify);
  // var Spotify = require('node-spotify-api');



  spotify.search({ searchArr }
    .then(function (response) {
      console.log(response);
    })
  )

  /* Spotify = new Spotify({
   id: "f185eccac4a54e4ca0e7e9932bcebbcf",
   secret: "c27587d0193443fc9545ccaa519894db"
 });
 
 spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
   if (err) {
     return console.log('Error occurred: ' + err);
   }

   // just added

   spotify
   .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
   .then(function(data) {
     console.log(data); 
   })
   .catch(function(err) {
     console.error('Error occurred: ' + err); 
   });
 
 console.log(data); 
 });
 }  */

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