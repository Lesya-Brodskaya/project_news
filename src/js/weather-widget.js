import moment from 'moment';

const API_KEY = 'c6d27dc8c63eae4b1bf25b80583f432d';
const URL = 'https://api.openweathermap.org/data/2.5/weather?';
const currentDate = moment().format('ddd Do MMMM YYYY');
function getWeatherInfo(city) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  )
    .then(resolve => {
      return resolve.json();
    })
    .then(weather => {
      const celsiusTemp =
        Math.round(weather.main.feels_like - 273.15) + '&deg;';

      const markup = `<div class="weather-card"><div class="weather-card__info"><p class="weather-card__temperature">${celsiusTemp}</p><p class="weather-card__main">${weather.weather[0].main}</p><p class="weather-card__geolocation">${weather.name}</p><img src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png"><p class="weather-card__date"></p>${currentDate}</div></div>`;
      return document.body.insertAdjacentHTML('beforeend', markup);
    });
}

// navigator.geolocation.getCurrentPosition(position => {
//   getWeatherInfo(position.coords.latitude, position.coords.longitude);
// });
function getWeatherByGeolocation() {
  fetch('https://ipinfo.io/json?token=2f70f8945bdfe0')
    .then(response => response.json())
    .then(currentCity => {
      getWeatherInfo(currentCity.city);
    });
}

getWeatherByGeolocation();
