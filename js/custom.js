$(window).on('load',function() {
    // Animate loader off screen
    $(".se-pre-con").fadeOut(5000);
});

var msg = "Sorry, you need to switch on location or use a recent browser"; //Error message for denied location
var latitude, longitude;
$(document).ready(function() {
    getLocation(); //on load, get location
    $('.jumbotron').hide(); //hide jumbotron on load
});

/* Checks if location is enabled*/
//Function getLocation
function getLocation() {
    if (Modernizr.geolocation) {
        //if locatin is enabled, show position in button
        navigator.geolocation.getCurrentPosition(success, fail);
    } else {
        alert("Sorry, you browser doesn't have geolocation");
    }
}
//if the user has location and clicked "allow"
function success(position) {

    latitude = position.coords.latitude; //stores latitude in a variable
    longitude = position.coords.longitude;//stores longitude in a variable
    var url = ""; //reset url
    url = "https://api.apixu.com/v1/current.json?key=07941261e9294bdfa75164128171605&q="; //url api
    url += (latitude + "," + longitude); //get values for our latitude and longitude
    $.getJSON(url, getWeather, 'jsonp'); //JSON call, uses the API url, calls getWeather function
}

//Fail function. msg is used to determine the reason
function fail(msg) {
    switch (msg.code) {
        case 1: //user denied the location
            alert("You denied the permission to the location");
            break;
        case 2: //location unaivalable
            alert("Location unaivalable");
            break;
        default: //timed out
            alert('Timed out');
            break;
    }
}
//Function getWeather
var getWeather = function(data) { //uses json data
    $('.jumbotron').delay('slow').show('400', function() { //slow delay to show the jumbotron
        $('.element').addClass('animated pulse'); //add animated pulse classes to .element
    });
    var location = (data.location.name); //stores the name of the place in a variable
    tempC = (data.current.temp_c); //stores the data in celsius in a variable
    tempCFull = tempC + "°C"; // adds the "°C" to the string
    var condition = (data.current.condition.text); //gets condition
    var icon = (data.current.condition.icon).substr(29); //stores the path of the icon in a variable
    var link = "img/" + icon; //concatenate with the "icon/"
    tempF = Math.round((tempC * 1.8 + 32) * 100) / 100 + "°F"; //convert °C in F°
    $('#city').text(location); //writes location
    $('#tempC').text(tempCFull); // °C
    $('#tempF').text(tempF).hide();// writes °F and hides it
    $('#condition').text("Current condition: " + condition); //writes condition
    $('#icon').attr('src', link); //gives the attr src from the variable link
};

//Two functions to switch between °C and °F
$('#tempC').click(function(event) {
    $('#tempF').show().text(tempF);
    $(this).hide();
});

$('#tempF').click(function(event) {
    $('#tempC').show().text(tempCFull);
    $(this).hide();
});
