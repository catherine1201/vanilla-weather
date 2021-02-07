  let dateElement = document.querySelector("#date-time");
  let currentTime = new Date();

  let date = currentTime.getDate();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
  let currentMonth = currentTime.getMonth();

  let currentYear = currentTime.getFullYear();

  let currentDay = currentTime.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ]

  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${ hours }`;
  }

  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${ minutes }`;
  }

  dateElement.innerHTML = `${ date } ${ months[ currentMonth ] } ${ currentYear } ${ days[ currentDay ] } ${ hours }:${ minutes }`;

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
  let day = days[ date.getDay() ];
  return `${ day } ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${ hours }`;
}
  let minutes = date.getMinutes();
  if (minutes < 10) {
  minutes = `0${ minutes }`;  
    }
    return `${ hours }:${ minutes }`;
  }
  
// to get temperature, humidity & windspeed
  function showTemperature(response) {
  console.log(response);
  console.log(response.data.main.temp);

  let location = response.data.name;
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${ location }`;
  
  let descriptionElement = response.data.weather[ 0 ].description;
  let h3 = document.querySelector("#weatherDescription");
  h3.innerHTML = `${ descriptionElement }`;
  
    let h4 = document.querySelector("#degrees");
    celsiusTemperature = response.data.main.temp;
    h4.innerHTML = Math.round(celsiusTemperature);
  // let temperature = Math.round(response.data.main.temp);
  // h4.innerHTML = ` ${ temperature }`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${ response.data.weather[ 0 ].icon }@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[ 0 ].description);

  let humidity = Math.round(response.data.main.humidity);
  let humid = document.querySelector(".humid");
  humid.innerHTML = ` ${ humidity }`;

  let windSpeed = Math.round(response.data.wind.speed);
  let speed = document.querySelector(".speed");
  speed.innerHTML = ` ${ windSpeed } `;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast1");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 3; index++){
    forecast = response.data.list[ index ];
    forecastElement.innerHTML += `
    <div class="col-2">
    <h3>
    ${ formatHours(forecast.dt * 1000) }
    </h3>
    <img src ="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
    <div class = "weather-forecast-temperature">
    <strong>
    ${ Math.round(forecast.main.temp_max) }°
    </strong>
    ${ Math.round(forecast.main.temp_min) }°
    </div>
    </div>
    `;
  }
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast3");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 3; index++){
    forecast = response.data.list[ index ];
    forecastElement.innerHTML += `
    <div class="col-2">
    <h3>
    ${ formatHours(forecast.dt * 1000) }
    </h3>
    <img src ="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
    <div class = "weather-forecast-temperature">
    <strong>
    ${ Math.round(forecast.main.temp_max) }°
    </strong>
    ${ Math.round(forecast.main.temp_min) }°
    </div>
    </div>
    `;
  }
}

// to get celsius & fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degrees");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) /5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#degrees");
  // let celsiusTemperature = (fahrenheitTemperature - 32) * 5 / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheitButton");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusTemperature = null;
let celsiusLink = document.querySelector("#celsiusbutton");
celsiusLink.addEventListener("click", convertToCelsius);


// search city in general
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  searchCity(city);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "ac4eabaa4e24a5a1b4be0fdf6adfaae8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);

  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(forecastUrl).then(displayForecast);
}

// to get current location using coordinates
function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiKey = "ac4eabaa4e24a5a1b4be0fdf6adfaae8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lon=${longitude}&lat=${latitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
}


function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// button for current location
let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

// button for search city
let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", search);

searchCity("Malaysia");