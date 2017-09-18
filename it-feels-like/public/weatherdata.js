$(document).ready(()=>{

var mylat;
var mylong;


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
            lat: position.coords.latitude,
            long: position.coords.longitude
          };
      $('#data').html(`latitude: ${userLocation.lat} longitude: ${userLocation.long}`);
      mylat = userLocation.lat;
      mylong = userLocation.long;

      const apistart = 'http://api.openweathermap.org/data/2.5/weather?';

      const appid = '&appid=964a6f877163808007380a84cce012ac'; //this is the api key
      const coordinates = 'lat='+mylat+'&lon='+mylong+'&cnt=10';
      const celcius = '&units=metric';

      getDataByCoordinates = ()=> {
        const api = apistart + coordinates + appid + celcius;

        $.getJSON(api, (data)=>{
          $('#data').html(`It's ${data.weather[0].description} in ${data.name}!
            <br> temperature: ${(data.main.temp).toFixed(1)}°C
            <br> humidity: ${data.main.humidity}%
            <br> Wind speed: ${data.wind.speed} m/s
            <br> Wind direction: ${data.wind.deg} degrees`);

        });
      };



  });
}


  // const apistart = 'http://api.openweathermap.org/data/2.5/weather?';
  // let mylat = userLocation.lat;
  // let mylong = userLocation.long;
  //
  // const appid = '&appid=964a6f877163808007380a84cce012ac'; //this is the api key
  // const coordinates = 'lat='+mylat+'&lon='+mylong+'&cnt=10';
  // const celcius = '&units=metric';
  //
  // getDataByCoordinates = ()=> {
  //   const api = apistart + coordinates + appid + celcius;
  //
  //   console.log(api);
  //   $.getJSON(api, (data)=>{
  //
  //     console.log(data.main.temp);
  //     console.log(data.name);
  //   });
  // };

  $('#dataBtn').on('click', (e) => {
    getDataByCoordinates();
  });


});
