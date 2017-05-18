var x = document.getElementById("location");

$(document).ready(function() {
    getLocation();
    $('.jumbotron').hide();
});
var latitude, longitude;
//$('#location').click(getLocation); // click to call function getLocation


/* Checks if location is enabled*/
//Function getLocation
function getLocation() {
    if (navigator.geolocation) {
        //if locatin is enabled, show position in button
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Please enable location to get your forecast');
    }
}
//Function showPosition
function showPosition(position) {
    /*x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;*/
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    //console.log (latitude + "+" + longitude);
    var url = "";
    url = "https://api.apixu.com/v1/current.json?key=07941261e9294bdfa75164128171605&q=";
    url += (latitude + "," + longitude);
    console.log(url);
    $.getJSON(url, getWeather, 'jsonp');
}

//Function getWeather
var getWeather = function(data) {
    $('.jumbotron').delay('slow').show('400', function() {
        $('.element').addClass('animated pulse');
    });
    var location = (data.location.name);
    tempC = (data.current.temp_c);
    tempCFull = tempC + "°C";
    var condition = (data.current.condition.text);
    var icon = (data.current.condition.icon).substr(29);
    var link = "img/" + icon;

    tempF = (tempC * 1.8 + 32) + "°F";
    console.log(tempF);
    $('#city').text(location);
    $('#tempC').text(tempCFull);
    $('#tempF').text(tempF).hide();
    $('#condition').text("Current condition: " + condition);
    $('#icon').attr('src', link);
};

$('#tempC').click(function(event) {
    $('#tempF').show().text(tempF);
    $(this).hide();
});

$('#tempF').click(function(event) {
    $('#tempC').show().text(tempCFull);
    $(this).hide();
});
