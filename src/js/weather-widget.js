import moment from 'moment';

const API_KEY = 'c6d27dc8c63eae4b1bf25b80583f432d';
const URL = 'https://api.openweathermap.org/data/2.5/weather?';
const currentWeekday = moment().format('dddd');
const currentDate = moment().format('Do MMM YYYY');

console.log(currentDate);

function getWeatherInfo(city) {
  return fetch(`${URL}q=${city}&appid=${API_KEY}`)
    .then(resolve => {
      return resolve.json();
    })
    .then(weather => {
      const celsiusTemp =
        Math.round(weather.main.feels_like - 273.15) + '&deg;';

      const markup = `<div class="weather-card"><ul class="weather-card__info"><li class="weather-card__temperature">${celsiusTemp}</li><li class="weather-card__main">${weather.weather[0].main}</li><li class="weather-card__geolocation"><svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.00001 1.125C7.35957 1.12694 5.78688 1.77945 4.62692 2.93941C3.46696 4.09938 2.81444 5.67207 2.81251 7.3125C2.81054 8.65306 3.24843 9.95725 4.05901 11.025C4.05901 11.025 4.22776 11.2472 4.25532 11.2793L9.00001 16.875L13.7469 11.2764C13.7717 11.2466 13.941 11.025 13.941 11.025L13.9416 11.0233C14.7517 9.95603 15.1894 8.65245 15.1875 7.3125C15.1856 5.67207 14.5331 4.09938 13.3731 2.93941C12.2131 1.77945 10.6404 1.12694 9.00001 1.125ZM9.00001 9.5625C8.555 9.5625 8.11998 9.43054 7.74997 9.18331C7.37996 8.93607 7.09157 8.58467 6.92128 8.17354C6.75098 7.7624 6.70642 7.31 6.79324 6.87355C6.88006 6.43709 7.09435 6.03618 7.40902 5.72151C7.72368 5.40684 8.1246 5.19255 8.56105 5.10573C8.99751 5.01892 9.44991 5.06347 9.86104 5.23377C10.2722 5.40407 10.6236 5.69246 10.8708 6.06247C11.118 6.43248 11.25 6.86749 11.25 7.3125C11.2493 7.90901 11.012 8.48087 10.5902 8.90267C10.1684 9.32446 9.59652 9.56176 9.00001 9.5625Z" fill="white"/>
</svg>${weather.name}</li></ul><img class="weather-card__icon" src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png"><p class="weather-card__date"><br>${currentWeekday}</br>${currentDate}</p></div>`;
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