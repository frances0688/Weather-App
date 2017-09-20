$(document).ready(()=>{

var mylat;
var mylong;

  //This is to get the geolocation. We need to change this to be more accurate. Use google maps api?
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
            lat: position.coords.latitude,
            long: position.coords.longitude
          };
      $('#location').html(`latitude: ${userLocation.lat} <br> longitude: ${userLocation.long}`);
      mylat = userLocation.lat;
      mylong = userLocation.long;

      const apistart = 'http://api.openweathermap.org/data/2.5/weather?';

      const appid = '&appid=964a6f877163808007380a84cce012ac'; //this is the api key
      const coordinates = 'lat='+mylat+'&lon='+mylong+'&cnt=10';
      const celcius = '&units=metric';

      const api = apistart + coordinates + appid + celcius;

      //This is to get the data from API according to user location
      getDataByCoordinates = ()=> {

        $.getJSON(api, (data)=>{
          $('#data').html(`It's ${data.weather[0].description} in ${data.name}!
            <br> temperature: ${(data.main.temp).toFixed(1)}°C
            <br> humidity: ${data.main.humidity}%
            <br> Wind speed: ${data.wind.speed} m/s
            <br> Wind direction: ${data.wind.deg} degrees`);

        });
      };




//Function to check if temp is higher or lower than user prefers
//And send a message according to that
      messageToday = ()=> {
        console.log('messageToday functon is called');

        $.getJSON(api, (data)=>{
          console.log('actual temp', data.main.temp);
          if (data.main.temp === userFront.idealTemp || data.main.temp === userFront.idealTemp+1 || data.main.temp === userFront.idealTemp-1 ){
          $('#today').html("<h1>This is a perfect day for you! Enjoy!</h1>");
          }
          else if (data.main.temp < userFront.hotTemp && data.main.temp > userFront.coldTemp)
          {$('#today').html("<h1>Today's gonna be a good day.</h1>");}
          else if (data.main.temp > userFront.hotTemp)
          {$('#today').html("<h1>It's too fucking hot for you today.</h1>");}
          else {$('#today').html("<h1>It's freezing outside. Stay in bed.</h1>");}
        });
      };

    });
  }



  $('#msgBtn').on('click', (e) => {
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
    closeNav();
    $( "#today" ).empty();
    getDataByCoordinates();
  });


});
