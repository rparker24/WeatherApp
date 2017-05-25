var key = require('./key.js');
var request = require('request');
var moment = require('moment');

var api_key = key.DarkSkyKey;

var myLatLong = [40.863419, -74.279168];
var location = myLatLong.join(',');

var queryURL = "https://api.darksky.net/forecast/" + api_key + "/" + location;

request(queryURL, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var data = JSON.parse(body);
  }
  console.log(moment.unix(data.currently.time).format("MM/DD/YYYY h:mm:ss A"), '\n');
  console.log("Currently: ", data.currently.summary, '\n');
  console.log("Current Temp: ", data.currently.temperature, "°F", '\n');
  console.log("Next Hour: ", data.minutely.summary, '\n');
  console.log("Today: ", data.hourly.summary, '\n');
	console.log("Today's High: ", Math.round(data.daily.data[0].temperatureMax), "°F");
	console.log("Today's Low: ", Math.round(data.daily.data[0].temperatureMin), "°F", '\n');
  console.log("This Week: ", data.daily.summary, '\n');
  for (i = 1; i < data.daily.data.length; i++) {
    if (i > 1) {
      var dayOfWeek = moment.unix(data.currently.time + (i * 86400)).format("dddd");
    } else {
      var dayOfWeek = "Tomorrow";
    }
    console.log(dayOfWeek + ": ", data.daily.data[i].summary);
		console.log("High:", Math.round(data.daily.data[i].temperatureMax), "°F");
		console.log("Low:", Math.round(data.daily.data[i].temperatureMin), "°F", '\n');
  }
});
