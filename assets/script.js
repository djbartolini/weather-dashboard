var apiKey = "8ceea4a5b8699e706f70618add0c2bc4";

var searchBrn = document.querySelector('.search-btn');
var userInput = document.querySelector('.user-input');
var mainCardParent = document.querySelector('.main-card-parent');
var mainDivEl = document.querySelector('.main-card-div');
var smallCardParent = document.querySelector('.small-card-parent');
var smallCardDiv = document.querySelector('.small-card-div');
var buttonDiv = document.querySelector('.button-div');


var handleSearch = function(event) {
    event.preventDefault();
    var q = userInput.value.trim();
    getLocationData(q);
    createMemoryButton(q);
}

var redoSearch = function(event) {
    event.preventDefault
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
                displayCards(data.list);
            });
        }
    })
    .catch(function (error) {
        alert('Unable to connect');
    });
}


var displayWeather = function(city, weather) {
    // Main card, current weather
        mainDivEl.innerHTML = null;

        var iconCode = weather[0].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
        
        // var mainDivEl = document.createElement('div');
        // mainDivEl.className = 'col-12';
        var mainCardEl = document.createElement('div');
        mainCardEl.className = 'card';
        var mainCardBodyEl = document.createElement('div');
        mainCardBodyEl.className = 'card-body';
        var mainH5el = document.createElement('h4');
        mainH5el.className = 'card-title';
        var iconSpanEl = document.createElement('span');
        var iconImgEl = document.createElement('img');
        iconImgEl.setAttribute('src', iconUrl);
        iconImgEl.setAttribute('alt', 'Weather icon');
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

        // mainCardParent.appendChild(mainDivEl);
        mainDivEl.appendChild(mainCardEl);
        mainCardEl.appendChild(mainCardBodyEl);
        mainCardBodyEl.append(mainH5el, mainPTemp, mainPWind, mainPHumidity);
        mainH5el.appendChild(iconSpanEl);
        iconSpanEl.append(iconImgEl);


        
    }
    
var displayCards = function(weather) {
    // Small cards, 5-day forecast  
        smallCardDiv.innerHTML = null;
        var dailyWeather =  weather.slice(7);
    
    for (var i = 0; i < dailyWeather.length; i = i + 8) {  
            
        var iconCode = dailyWeather[i].weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";

        // var smallCardDiv = document.createElement('div');
        // smallCardDiv.className = 'row';
        var smallCardEl = document.createElement('div');
        smallCardEl.className = 'card col-2 m-2';
        var smallCardBody = document.createElement('div');
        smallCardBody.className = 'card-body';
        var smallH5El = document.createElement('h5');
        smallH5El.className = 'card-title';
        var smallImgEl = document.createElement('img');
        smallImgEl.setAttribute('src', iconUrl);
        smallImgEl.setAttribute('alt', 'Weather icon');
        var smallPTemp = document.createElement('p');
        smallPTemp.className = 'card-text fs-6';
        var smallPWind = document.createElement('p');
        smallPWind.className = 'card-text fs-6';
        var smallPHumidity = document.createElement('p');
        smallPHumidity.className = 'card-text fs-6';

        smallH5El.textContent = dailyWeather[i].dt_txt.slice(5, 10);
        smallPTemp.textContent = "Temp: " + dailyWeather[i].main.temp + " °F";
        smallPWind.textContent = "Wind: " + dailyWeather[i].wind.speed + " mph";
        smallPHumidity.textContent = "Humidity: " + dailyWeather[i].main.humidity + "%";
        console.log(dailyWeather[i].dt_txt);

        // smallCardParent.appendChild(smallCardDiv);
        smallCardDiv.appendChild(smallCardEl);
        smallCardEl.appendChild(smallCardBody);
        smallCardBody.appendChild(smallH5El);
        smallH5El.append(smallImgEl, smallPTemp, smallPWind, smallPHumidity);
    }
}

// Create buttons via city names saved in local storage

var createMemoryButton = function(city) {
    localStorage.setItem('city', city);

    var buttonEl = document.createElement('button');
    buttonEl.className = 'btn btn-primary'
    buttonEl.setAttribute('type', 'button');
    
    arr = city.split(" ")
    for (i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    cityCapitalized = arr.join(" ");

    console.log(cityCapitalized);
    
    buttonEl.textContent = cityCapitalized;

    buttonDiv.appendChild(buttonEl);

    buttonEl.addEventListener('click', redoSearch);
}



searchBrn.addEventListener('click', handleSearch);