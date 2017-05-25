var key = require('./key.js');
var request = require('request');
var express =  require('express');
var moment = require('moment');
var fs = require('fs');

var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.send(index.html);
});

var api_key = key.DarkSkyKey;

var myLatLong = [40.863419, -74.279168];
var location = myLatLong.join(',');

var queryURL = "https://api.darksky.net/forecast/" + api_key + "/" + location;

request(queryURL, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var data = JSON.parse(body);
  }
  fs.writeFile("c:/personal/Weather/public/json/weatherData.json", JSON.stringify(data, null, 4), function(err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log("JSON file created");
  });
});

var PORT = 3000;

app.listen(PORT, function() {
	console.log('App running on port ' + PORT);
});
