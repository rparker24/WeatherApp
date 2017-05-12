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

function getWeatherData() {
  var myLatLong = [40.863419, -74.279168];
  var location = myLatLong.join(',');

  var queryURL = "https://api.darksky.net/forecast/" + api_key + "/" + location;

  request(queryURL, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      weatherData = data;
    }
    console.log(moment.unix(data.currently.time).format("MM/DD/YYYY h:mm:ss A"), '\n');
    console.log("Currently: ", data.currently.summary, '\n');
    console.log("Current Temp: ", data.currently.temperature, "°F", '\n');
    console.log("Next Hour: ", data.minutely.summary, '\n');
    console.log("Today: ", data.hourly.summary, '\n');
    console.log("This Week: ", data.daily.summary, '\n');
    for (i = 1; i < data.daily.data.length; i++) {
      if (i > 1) {
        var dayOfWeek = moment.unix(data.currently.time + (i * 86400)).format("dddd");
      } else {
        var dayOfWeek = "Tomorrow";
      }
      console.log(dayOfWeek + ": ", data.daily.data[i].summary, '\n');
    }
    fs.writeFile("c:/personal/Weather/public/json/weatherData.json", JSON.stringify(data, null, 4), function(err) {
      if (err) {
        console.error(err);
        return;
      }
      console.log("JSON file created");
    });
  });
}

getWeatherData();

var PORT = 3000;

app.listen(PORT, function() {
	console.log('App running on port ' + PORT);
});
