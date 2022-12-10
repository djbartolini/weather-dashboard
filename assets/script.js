var apiKey = "8ceea4a5b8699e706f70618add0c2bc4";

var searchBrn = document.querySelector('.search-btn');
var userInput = document.querySelector('.user-input');
var mainCardParent = document.querySelector('.main-card-parent');



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
    
    
var getWeatherData = function(lat, lon) {    
    var weatherUrl = "https:api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    fetch(weatherUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data.city);
                console.log(data.list);
                displayWeather(data.city, data.list);
            });
        }
    })
    .catch(function (error) {
        alert('Unable to connect');
    });
}

var displayWeather = function(city, weather) {
    // Main card, current weather
        iconCode = weather[0].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        
        var mainDivEl = document.createElement('div');
        mainDivEl.className = 'card';
        var mainCardEl = document.createElement('div');
        mainCardEl.className = 'card';
        var mainCardBodyEl = document.createElement('div');
        mainCardBodyEl.className = 'card-body';
        var mainH5el = document.createElement('h4');
        mainH5el.className = 'card-title';
        var iconSpanEl = document.createElement('span');
        var iconImgEl = document.createElement('img');
        iconImgEl.setAttribute('src', iconUrl);
        var mainPTemp = document.createElement('p');
        mainPTemp.className = 'card-text';
        var mainPWind = document.createElement('p');
        mainPWind.className = 'card-text';
        var mainPHumidity = document.createElement('p');
        mainPHumidity.className = 'card-text';

        

        mainH5el.textContent = city.name;
        mainPTemp.textContent = "Temp: " + weather[0].main.temp + " °F";
        mainPWind.textContent = "Wind: " + weather[0].wind.speed + " mph";
        mainPHumidity.textContent = "Humidity: " + weather[0].main.humidity + "%";

        mainCardParent.appendChild(mainDivEl);
        mainDivEl.appendChild(mainCardEl);
        mainCardEl.appendChild(mainCardBodyEl);
        mainCardBodyEl.append(mainH5el, mainPTemp, mainPWind, mainPHumidity);
        mainH5el.appendChild(iconSpanEl);
        iconSpanEl.append(iconImgEl);
    }


searchBrn.addEventListener('click', handleSearch);