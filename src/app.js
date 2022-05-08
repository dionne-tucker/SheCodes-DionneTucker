//Display current time

let now = new Date();

let hours = now.getHours();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let date = now.getDate();

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
  "Dec",
];

let month = months[now.getMonth()];

let currentDate = document.querySelector(".current-date");
currentDate.innerHTML =
  `${day} | ${month} ${date} | ${hours}:${minutes}`.toUpperCase();

//Display forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thursday", "Friday", "Saturday", "Sunday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col card-column">
              <h5 class="card-title">${day}</h5>
              <div class="card border-0 h-100">
                <div class="text-center">
                  <span class="card-temp">48°</span>
                  <div>
                    <img
                      src="images/04d.png"
                      class="card-img-top card-image"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Display current city

function displayCity(event) {
  event.preventDefault();
  let input = document.querySelector("#input-city");
  let cityName = document.querySelector(".city-name");
  cityName.innerHTML = input.value.toUpperCase();
  let city = input.value;
  searchCityName(city);
}

let form = document.querySelector(".form-search");
form.addEventListener("submit", displayCity);

//Switch between fahrenheit and celsius temperatures

function showCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = celsiusTemperature;
  fahrenheit.classList.remove("active-link");
  celsius.classList.add("active-link");
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheit.classList.add("active-link");
  celsius.classList.remove("active-link");
}

let fahrenheitTemperature = null;

let celsius = document.querySelector(".celsius-link");
celsius.addEventListener("click", showCelsius);

let fahrenheit = document.querySelector(".fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

//Display temperature of a city

function showTemperature(response) {
  let cityTemp = Math.round(response.data.main.temp);
  let cityDescription = response.data.weather[0].main;
  let cityWind = Math.round(response.data.wind.speed);
  let cityHumidity = response.data.main.humidity;
  let cityIcon = response.data.weather[0].icon;

  fahrenheitTemperature = response.data.main.temp;

  let degrees = document.querySelector("#temperature");
  degrees.innerHTML = cityTemp;

  let description = document.querySelector(".current-condition-text");
  description.innerHTML = cityDescription;

  let wind = document.querySelector(".current-wind");
  wind.innerHTML = `${cityWind} m/h`;

  let humidity = document.querySelector(".current-humidity");
  humidity.innerHTML = `${cityHumidity}%`;

  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `images/${cityIcon}.png`);
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
  let cityWind = Math.round(response.data.wind.speed);
  let cityHumidity = response.data.main.humidity;
  let cityIcon = response.data.weather[0].icon;

  let city = document.querySelector(".city-name");
  city.innerHTML = currentCity;

  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = currentTemperature;

  let description = document.querySelector(".current-condition-text");
  description.innerHTML = currentDescription;

  let wind = document.querySelector(".current-wind");
  wind.innerHTML = `${cityWind} m/h`;

  let humidity = document.querySelector(".current-humidity");
  humidity.innerHTML = `${cityHumidity}%`;

  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `images/${cityIcon}.png`);
}

let currentButton = document.querySelector(".button-current-location");
currentButton.addEventListener("click", currentPosition);

displayForecast();
