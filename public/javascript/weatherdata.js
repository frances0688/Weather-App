$(document).ready(() => {
  currentLocation();
  var userLocation;
  var weatherData;
  var cityName;

  function uiReady() {
    $('#msgBtn').removeClass('disabled');
    $('#dataBtn').removeClass('disabled');
    // $('#newLocationBtn').removeClass('disabled');
    $('.bubblingG').hide();
    // also hide the spinner
  }

  //This is to get the geolocation. We need to change this to be more accurate. Use google maps api?
  function currentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        userLocation = {
          lat: position.coords.latitude,
          long: position.coords.longitude
        };
        getWeather();
      });
    }
  }

  // Get coordinates for new location
  // $("#locationBtn").click(function(e){
  //   e && e.preventDefault();
  //   var geocoder =  new google.maps.Geocoder();
  //   geocoder.geocode({ 'address': $('#pac-input').val()}, function(results, status) {
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       userLocation ={
  //         lat: results[0].geometry.location.lat(),
  //         long: results[0].geometry.location.lng()
  //       }
  //     } else {
  //       alert("Something went wrong " + status);
  //     }
  //   });
  // });

  // Get name of city
  function getCity(lat, long, cb) {
    var geocoder =  new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(lat, long);
      geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK && results[1]) {
          var indice = 0;
          for (var j = 0; j < results.length; j++) {
            if (results[j].types[0] == 'locality') {
              indice = j;
              break;
            }
          }
          for (var i=0; i < results[j].address_components.length; i++) {
            if (results[j].address_components[i].types[0] == "locality") {
              //this is the object you are looking for
              city = results[j].address_components[i];
            }
            if (results[j].address_components[i].types[0] == "country") {
              //this is the object you are looking for
              country = results[j].address_components[i];
            }
          }
          //city data
          cityName = city.long_name + ", " + country.short_name;
        }
        cb();
      });
 }
 

  //Function to check if temp is higher or lower than user prefers
  //And send a message according to that
  function messageToday () {

    const celsius = (weatherData.currently.temperature - 32) * (5/9);
    const fahrenheit = weatherData.currently.temperature;

    var coldArray =   [
          "<h1>It's so cold outside I actually saw a gangsta pull up his pants.</h1>",
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
          "<h1>The Weather-Gods have listened.</h1>",
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
      if (userFront.idealTemp <= celsius && celsius <= userFront.idealTemp+2){
        $('#today').html(idealmsg);
        $( ".user-wrapper" ).toggleClass( 'idealbg' );
      } else if (celsius < userFront.idealTemp-2 && celsius > userFront.idealTemp-8) {
        $('#today').html(sortofcoldmsg);
          $( ".user-wrapper" ).toggleClass( 'sortofcoldbg' );
      } else if (celsius < userFront.idealTemp+8 && celsius > userFront.idealTemp+2) {
        $('#today').html(sortofhotmsg);
        $( ".user-wrapper" ).toggleClass( 'sortofhotbg' );
      } else if (celsius > userFront.idealTemp+8) {
        $('#today').html(hotmsg);
          $( ".user-wrapper" ).toggleClass( 'hotbg' );
      } else {
        $('#today').html(coldmsg);
          $( ".user-wrapper" ).toggleClass( 'coldbg');

      }
    } else {
      if (userFront.idealTemp-5 <= fahrenheit <= userFront.idealTemp+5){
        $('#today').html(idealmsg);
      } else if (fahrenheit < userFront.idealTemp && fahrenheit > userFront.idealTemp-20) {
        $('#today').html(sortofcoldmsg);
      } else if (fahrenheit < userFront.idealTemp+20 && fahrenheit > userFront.idealTemp) {
        $('#today').html(sortofhotmsg);
      } else if (fahrenheit > userFront.idealTemp+20) {
        $('#today').html(hotmsg);
      } else {
        $('#today').html(coldmsg);
      }
    }
  }


  function getWeather() {
    const path = '/weather/' + userLocation.lat + '/' + userLocation.long;
    $.getJSON(path, (response) => {
      weatherData = response;
      getCity(userLocation.lat, userLocation.long, function () {
        uiReady();
        $('#msgBtn').trigger('click');
      });      
    });

  }

  function displayData() {
    const celsius = (weatherData.currently.temperature - 32) * (5/9);
    const feelsLikeCelsius = (weatherData.currently.apparentTemperature - 32) * (5/9);
    const chanceOfRain = weatherData.currently.precipProbability*100;
    const humidity = weatherData.currently.humidity*100;

    var html = "<span class='dataMsg'> Today, it's " + weatherData.currently.summary + "</span>";
    if (cityName) {
      html += "<br> in " + cityName;
    }
    html += "<br><br><br><span class='bigTemp'>";
    if (userFront.degree === 'C' || userFront.degree === 'c') {
      html += celsius.toFixed(1) +"°C</span><br><br><br> It feels like "  + feelsLikeCelsius.toFixed(1) + "°C";
    } else {
      html += weatherData.currently.temperature.toFixed(1) +"°F</span><br><br><br> It feels like " + weatherData.currently.apparentTemperature.toFixed(1) + "°F";
    }
    html += "<br> Chance of rain " + chanceOfRain + "% <br> Humidity " + humidity + "% <br> Wind Speed " + weatherData.currently.windSpeed + " mph";
    $('#data').html(html);
  }

  $('#msgBtn').on('click', (e) => {
    console.log('showing today');
    if ($('#msgBtn').hasClass('disabled')) {
      return;
    }
    $( "#today" ).show();
    $( "#data" ).hide();
    // $( "#location" ).hide();
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
    // $( "#location" ).hide();
    displayData();
  });

  // $('#newLocationBtn').on('click', (e) => {
  //   if ($('#newLocationBtn').hasClass('disabled')) {
  //     return;
  //   }
  //   closeNav();
  //   $( "#data" ).hide();
  //   $( "#today" ).hide();
  //   $( "#location" ).show();
  //   displayData();
  // });

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
