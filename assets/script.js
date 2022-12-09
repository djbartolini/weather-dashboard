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
                // displayResults(data.results, q);
                console.log(data);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to LOC');
    });
}
    
    
// var getWeatherData = function(q) {    
//     var fetchUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat "&lon=" + lon "&appid" + apiKey;
// }

searchBrn.addEventListener('click', handleSearch);