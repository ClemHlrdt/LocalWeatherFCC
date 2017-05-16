var x = document.getElementById("location");

var url = "https://api.apixu.com/v1/current.json?key=07941261e9294bdfa75164128171605&q=";
var latitude, longitude;
$('#location').click(getLocation); // click to call function getLocation

/* Checks if location is enabled*/
function getLocation() {
    if (navigator.geolocation) {
        //if locatin is enabled, show position in button
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    //console.log (latitude + "+" + longitude);
    url += (latitude + "," + longitude);
    console.log(url);
    $.getJSON(url, getWeather, 'jsonp');
}

var getWeather = function (data) {
    var tempC = (data.current.temp_c);
    alert(tempC);
    $('#temp').text(tempC);

};
