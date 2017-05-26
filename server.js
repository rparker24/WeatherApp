var key = require('./key.js');
var express =  require('express');
var app = express();
var request = require('request');
var moment = require('moment');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');

app.use(logger('dev'));

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(express.static('public'));

// DB Config
mongoose.connect('mongodb://localhost/Weather');
var db = mongoose.connection;

db.on('error', function(err) {
	console.log('Mongoose Error: ', err);
});
db.once('open', function() {
	console.log('Mongoose connection successful.');
});

var Weather = require('./models/weatherData');

app.get('/', function(req, res) {

	var api_key = key.DarkSkyKey;

	var myLatLong = [40.863419, -74.279168];
	var location = myLatLong.join(',');

	var queryURL = "https://api.darksky.net/forecast/" + api_key + "/" + location;

	request(queryURL, function(error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var data = JSON.parse(body);
	  }

		var dataType = typeof(data);
		console.log(dataType);

		var weatherData = new Weather (data);

		weatherData.save(function(err, doc) {
			if (err) {
				console.log(err);
			} else {
				console.log(doc);
			}
		});
		// removed fs write to json file

	});

	res.send(index.html);
});

var PORT = 3000;

app.listen(PORT, function() {
	console.log('App running on port ' + PORT);
});
