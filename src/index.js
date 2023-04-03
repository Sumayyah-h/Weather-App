function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `  
    <div class="col-2">
      <div class="forecast-display-date">
        Sat
      </div>
      <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png" 
      alt="" 
      width="70px">
      <div class="forecast-display-temperature">
      <span class="forecast-display-temperature-min">
      3° 
      </span>
      <span class="forecast-display-temperature-max">
      <strong>
      8°
      </strong>
      </span>
      </div>
    </div>
  `;

  forecastHTML = 
    forecastHTML + 
    `  
    <div class="col-2">
      <div class="forecast-display-date">
        Sat
      </div>
      <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png" 
      alt="" 
      width="70px">
      <div class="forecast-display-temperature">
      <span class="forecast-display-temperature-min">
      3° 
      </span>
      <span class="forecast-display-temperature-max">
      <strong>
      8°
      </strong>
      </span>
      </div>
    </div>
  `;
  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML;
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  document.querySelector("#highest").innerHTML = Math.round(
    response.data.temperature.maximum
  );
  document.querySelector("#lowest").innerHTML = Math.round(
    response.data.temperature.minimum
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  //document.querySelector("#sunset").innerHTML = response.data.main.sunset;

  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "7157tdo40a4aac83b0ebaf1beb1f3181";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "fbef01f4et1b02o0d25c27210a43ef3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let highestElement = document.querySelector("#highest");

let lowestElement = document.querySelector("#lowest");

let feelslikeElement = document.querySelector("#feels-like");

let iconElement = document.querySelector("#icon");

displayForecast();