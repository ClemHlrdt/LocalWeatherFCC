var x = document.getElementById("location");


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
    /*x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;*/
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    //console.log (latitude + "+" + longitude);
    var url ="";
    url = "https://api.apixu.com/v1/current.json?key=07941261e9294bdfa75164128171605&q=";
    url += (latitude + "," + longitude);
    console.log(url);
    $.getJSON(url, getWeather, 'jsonp');
}

var getWeather = function (data) {
    var location = (data.location.name);
    var tempC = (data.current.temp_c);
    var condition = (data.current.condition.text);
    $('#city').text("City: " + location);
    $('#temp').text("Current temperature: " + tempC + "°C");
    $('#condition').text("Current condition: " + condition );

};
