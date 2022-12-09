var apiKey = "8ceea4a5b8699e706f70618add0c2bc4";

var searchBrn = document.querySelector('.search-btn');
var userInput = document.querySelector('.user-input')


var handleSearch = function(event) {
    event.preventDefault();
    var q = userInput.value.trim();
    getLocationData(q);
}

var getLocationData = function(q) {
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + q + "&limit=" + "5" + "&appid=" + apiKey; 
    
    fetch(geocodeUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                getCoordinates(data);
                console.log(data);
            });
        }
    })
    .catch(function (error) {
        alert('Unable to connect');
    });
}

var getCoordinates = function(data) {
    var lat = data[0].lat.toString();
    var lon = data[0].lon.toString();
    console.log("LAT", lat);
    console.log("LON", lon);

    getWeatherData(lat, lon);
}
    
    
var getWeatherData = function(data) {    
    var fetchUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat "&lon=" + lon "&appid" + apiKey;


}

searchBrn.addEventListener('click', handleSearch);