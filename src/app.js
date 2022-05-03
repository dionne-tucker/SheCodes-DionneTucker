//Display current time

let now = new Date();

let hours = now.getHours();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let currentDate = document.querySelector(".current-date");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

//Display current city

function displayCity(event) {
  event.preventDefault();
  let input = document.querySelector("#input-city");
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = input.value;
  let city = input.value;
  searchCityName(city);
}

let form = document.querySelector(".form-search");
form.addEventListener("submit", displayCity);

//Switch between fahrenheit and celsius temperatures
/*
function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 45;
}

function showCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 15;
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsius);
*/
//Display temperature of a city

function showTemperature(response) {
  let cityTemp = Math.round(response.data.main.temp);
  let cityDescription = response.data.weather[0].main;

  let degrees = document.querySelector("#temperature");
  degrees.innerHTML = cityTemp;

  let description = document.querySelector(".current-condition-text");
  description.innerHTML = cityDescription;
}

function searchCityName(city) {
  let apiKey = `a6fd60837a51500b42c27ddff0bfd417`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);
}

//Get weather of the current location

function currentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = `a6fd60837a51500b42c27ddff0bfd417`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showCurrentTemperature);
}

function showCurrentTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let currentDescription = response.data.weather[0].main;

  let city = document.querySelector(".city-name");
  city.innerHTML = currentCity;

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = currentTemperature;

  let description = document.querySelector(".current-condition-text");
  description.innerHTML = currentDescription;
}

let currentButton = document.querySelector(".button-current-location");
currentButton.addEventListener("click", currentPosition);
