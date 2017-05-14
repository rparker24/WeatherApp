$(document).ready(function() {
  $.getJSON( "./json/weatherData.json", function(data) {
    $('#date-time').html(moment.unix(data.currently.time).format("MM/DD/YYYY h:mm:ss A"), '\n');
    $('#current-temp').html(Math.round(data.currently.temperature));
    $('#current-condition').html(data.currently.summary);
    $('#next-hour-forecast').html(data.minutely.summary);
    $('#today-forecast').html(data.hourly.summary);
    $('#week-forecast').html(data.daily.summary);
    for (i = 1; i < data.daily.data.length; i++) {
      if (i > 1) {
        var dayOfWeek = moment.unix(data.currently.time + (i * 86400)).format("dddd");
      } else {
        var dayOfWeek = "Tomorrow";
      }
      $('#week-daily-forecast').append("<li class='weekday'>" + "<p><strong>" + dayOfWeek + ": </strong>" + data.daily.data[i].summary + "</p>" + "<p>High: <span class='high-temp'>" + Math.round(data.daily.data[i].temperatureMax) + "</span>&#8457; - Low: <span class='low-temp'>" + Math.round(data.daily.data[i].temperatureMin) + "</span>&#8457;</p></li>");
    }

    for (i = 0; i < 9; i++) {
      // limited to 9 results, to display all available switch 9 with data.hourly.data.length
      var info = data.hourly.data[i];
      $('#hourly-list').append("<li><h4>" + moment.unix(info.time).format("ddd, hA") + "</h4><h6>" + "Summary: " + info.summary + "</h6><p>Temp: " + Math.round(info.temperature) + "&#8457;</p></li>");
    }
  });
});
