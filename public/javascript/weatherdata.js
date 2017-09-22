$(document).ready(() => {

  var userLocation;
  var weatherData;

  function uiReady() {
    $('#msgBtn').removeClass('disabled');
    $('#dataBtn').removeClass('disabled');
    $('.bubblingG').hide();
    // also hide the spinner
  }

  //Function to check if temp is higher or lower than user prefers
  //And send a message according to that
  function messageToday () {
    const celsius = (weatherData.currently.temperature - 32) * (5/9);
    const farenheit = weatherData.currently.temperature;


    var coldArray =   [
          "<h1>" +userFront.name+ "It's so cold outside I actually saw a gangsta pull up his pants.</h1>",
          "<h1>I bet you miss hating the summer heat right now.</h1>",
          "<h1>It's so damn cold you might fart snowflakes</h1>"
        ];
    var coldmsg = coldArray[Math.floor(Math.random() * coldArray.length)];

    var hotArray =   [
          "<h1>Satan called. He wants his weather back.</h1>",
          "<h1>It's 'unsticking your thighs from plastic chair'-day.</h1>",
          "<h1>The heat index is somewhere between OMG and WTF.</h1>"
        ];
    var hotmsg = hotArray[Math.floor(Math.random() * hotArray.length)];

    var idealArray =   [
          "<h1>The day is perfect. Enjoy!</h1>",
          "<h1>The weather Gods have listened.</h1>",
          "<h1>What a wonderful day...</h1>"
        ];
    var idealmsg = idealArray[Math.floor(Math.random() * idealArray.length)];

    var sortofcoldArray =   [
          "<h1>It's a bit chilly outside, you might want to take a light jacket.</h1>",
          "<h1>Sweater weather is better weather.</h1>",
          "<h1>It's never too cold for ice cream</h1>"
        ];
    var sortofcoldmsg = sortofcoldArray[Math.floor(Math.random() * sortofcoldArray.length)];

    var sortofhotArray =   [
          "<h1>Bring out the tank tops!</h1>",
          "<h1>Dear weather, stop showing off...We know you're hot.</h1>",
          "<h1>It's a little warm, but nothing a cold beer can't fix.</h1>"
        ];
    var sortofhotmsg = sortofhotArray[Math.floor(Math.random() * sortofhotArray.length)];

    if (userFront.degree === 'C' || userFront.degree === 'c') {
      if (celsius === userFront.idealTemp || celsius === userFront.idealTemp+1 || celsius === userFront.idealTemp-1 ){
        $('#today').html(idealmsg);
        $('.user-wrapper').addClass(idealbg);

      } else if (celsius < userFront.idealTemp && celsius > userFront.coldTemp) {
        $('#today').html(sortofcoldmsg);
        $('.user-wrapper').addClass(sortofcoldbg);
      } else if (celsius < userFront.hotTemp && celsius > userFront.idealTemp) {
        $('#today').html(sortofhotmsg);
        $('.user-wrapper').addClass(sortofhotbg);
      } else if (celsius > userFront.hotTemp) {
        $('#today').html(hotmsg);
        $('.user-wrapper').addClass(hotbg);
      } else {
        $('#today').html(coldmsg);
        $('.user-wrapper').addClass(coldbg);
      }
    } else {
      if (farenheit === userFront.idealTemp || farenheit === userFront.idealTemp+1 || farenheit === userFront.idealTemp-1 ){
        $('#today').html(idealmsg);
      } else if (farenheit < userFront.idealTemp && farenheit > userFront.coldTemp) {
        $('#today').html(sortofcoldmsg);
      } else if (farenheit < userFront.hotTemp && farenheit > userFront.idealTemp) {
        $('#today').html(sortofhotmsg);
      } else if (farenheit > userFront.hotTemp) {
        $('#today').html(hotmsg);
      } else {
        $('#today').html(coldmsg);
      }
    }
  }

  function displayData() {
    const celsius = (weatherData.currently.temperature - 32) * (5/9);
    const feelsLikeCelsius = (weatherData.currently.apparentTemperature - 32) * (5/9);
    const chanceOfRain = weatherData.currently.precipProbability*100;
    const humidity = weatherData.currently.humidity*100;

    if (userFront.degree === 'C' || userFront.degree === 'c')
    {
      $('#data').html("<span class='bigTemp'>" + celsius.toFixed(1) +"°C</span><br> It feels like "  + feelsLikeCelsius.toFixed(1) + "°C <br><br><span class='dataMsg'> Today it's " + weatherData.currently.summary + "<br><br> </span> Chance of rain " + chanceOfRain + "% <br> Humidity " + humidity + "% <br> Wind Speed " + weatherData.currently.windSpeed + " mph"  );
    } else {
      $('#data').html("<span class='bigTemp'>" + weatherData.currently.temperature.toFixed(1) +"°F</span><br> It feels like "  + weatherData.currently.apparentTemperature.toFixed(1) + "°F <br><br><span class='dataMsg'> Today it's " + weatherData.currently.summary + "<br><br> </span> Chance of rain " + chanceOfRain + "% <br> Humidity " + humidity + "% <br> Wind Speed " + weatherData.currently.windSpeed + " mph"  );
    }

  }

  //This is to get the geolocation. We need to change this to be more accurate. Use google maps api?
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      userLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      };

      // var degree = '';
      // if (userFront.degree === 'C' || userFront.degree === 'c') {
      //   degree = units=[si];
      // }
      const path = '/weather/' + userLocation.lat + '/' + userLocation.long;

      $.getJSON(path, (response) => {
        weatherData = response;
        uiReady();
        messageToday();
      });
    });
  }

  $('#msgBtn').on('click', (e) => {
    if ($('#msgBtn').hasClass('disabled')) {
      return;
    }
    $( "#today" ).show();
    $( "#data" ).hide();
    closeNav();
    messageToday();
  });

  $('#dataBtn').on('click', (e) => {
    if ($('#dataBtn').hasClass('disabled')) {
      return;
    }
    closeNav();
    $( "#data" ).show();
    $( "#today" ).hide();
    displayData();
  });


});
//
// var lovesunnyArray =   [
//       "<h1>Today you might suffer from heliophilia. (look it up...)</h1>",
//       "<h1>Bathing suit and flip flops. Yep, beach day!</h1>",
//       "<h1>Today = Sunshine</h1>"
//     ];
// var lovesunnymsg = lovesunnyArray[Math.floor(Math.random() * lovesunnyArray.length)];
//
// var hatesunnyArray =   [
//       "<h1>Bring out the tank tops!</h1>",
//       "<h1>Dear weather, stop showing off...We know you're hot.</h1>",
//       "<h1>It's a little warm, but nothing a cold beer can't fix.</h1>"
//     ];
// var hatesunnymsg = hatesunnyArray[Math.floor(Math.random() * hatesunnyArray.length)];


// SUNNY:
//
//
//
//
// RAINING:
// WINDY:
// SNOWING:
