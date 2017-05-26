var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var WeatherDataSchema = new Schema({
  data: {
    type: Object,
    required: "The weather data is required"
  },
  created_at: {
    date: {
      type: Date,
      default: Date.now
    },
    readable: {
      type: String,
      default: moment().format("MMMM Do YYYY, h:mm:ss A")
    },
    unix: {
      type: Number,
      default: moment().unix()
    }
  }
});

var Weather = mongoose.model('WeatherData', WeatherDataSchema);
module.exports = Weather;
