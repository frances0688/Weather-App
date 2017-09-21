$(document).ready(() => {

  var userLocation;
  var weatherData;

  function uiReady() {
    $('#msgBtn').removeClass('disabled');
    $('#dataBtn').removeClass('disabled');
    // also hide the spinner
  }

  //Function to check if temp is higher or lower than user prefers
  //And send a message according to that
  function messageToday () {

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

    console.log('actual temp', weatherData.main.temp);
    if (weatherData.main.temp === userFront.idealTemp || weatherData.main.temp === userFront.idealTemp+1 || weatherData.main.temp === userFront.idealTemp-1 ){
      $('#today').html(idealmsg);
    } else if (weatherData.main.temp < userFront.idealTemp && weatherData.main.temp > userFront.coldTemp) {
      $('#today').html(sortofcoldmsg);
    } else if (weatherData.main.temp < userFront.hotTemp && weatherData.main.temp > userFront.idealTemp) {
      $('#today').html(sortofhotmsg);
    } else if (weatherData.main.temp > userFront.hotTemp) {
      $('#today').html(hotmsg);
    } else {
      $('#today').html(coldmsg);
    }
  };

  function displayData() {
    console.log(weatherData);
  }

  //This is to get the geolocation. We need to change this to be more accurate. Use google maps api?
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      userLocation = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      };
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
    console.log('clicking clicking');
    console.log(
      userFront.idealTemp, 'ideal',
       userFront.coldTemp, 'cold',
     userFront.hotTemp, 'hot'  );
    $( "#data" ).empty();
    closeNav();
    messageToday();
  });

  $('#dataBtn').on('click', (e) => {
    if ($('#dataBtn').hasClass('disabled')) {
      return;
    }
    closeNav();
    $( "#today" ).empty();
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
