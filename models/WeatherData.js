var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WeatherDataSchema = new Schema({
  data: {
    type: Object,
    required: "The weather data is required"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Weather = mongoose.model('WeatherData', WeatherDataSchema);
module.exports = Weather;
