
var temp = (data.main.temp).toFixed(1);

function messageToday() {
  console.log('message functon is called');
  if (user.preferences.hotTemp < temp){
    $('#today').html("It's too hot today! Stay inside");
  }
}

$('#msgBtn').on('click', (e) => {
  closeNav();
  // messageToday();
});
