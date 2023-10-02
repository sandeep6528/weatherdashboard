const cityInput =  document.querySelector(".city-input");
 const searchButton = document.querySelector(".search-btn");
const historyElement = document.querySelector(".history");

const detailsTitle = document.querySelector(".details h2");
const temperaureElement = document.querySelector(".temperature");
const windElement = document.querySelector(".wind");
const humidityElement = document.querySelector(".humidity");
const weatherCards = document.querySelector(".weather-cards")

 const history = []
 const apiKey = "1893c89b16176c170ff3bd5727c18e43"

const getCityCoordinates = () => {
    const cityName = cityInput.value.trim();
    if(!cityName) return;

    history.push(cityName);
    renderHistory()
    loadForecast(cityName)

    cityInput.value = ''

}
function renderHistory(){
    historyElement.innerHTML = ''
    history.forEach((item) => {
        const button = document.createElement('button');
        button.onclick = () => loadForecast(item);
        button.className = 'atlanta-btn'
        button.innerText = item;

      historyElement.appendChild(button)
    });
}

function loadForecast(city){
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?cnt=6&units=imperial&q=' + city + '&appid=' + apiKey;
    
const xhttp = new XMLHttpRequest();
xhttp.onload = function() {
  const forecast = JSON.parse(this.responseText);
  const today = forecast.list.shift();

 detailsTitle.innerText = forecast.city.name + '(' + today.dt_txt.slice(0,10) + ')';
temperaureElement.innerText = 'Temperature:' + today.main.temp + '°F'
windElement.innerHTML = 'Wind:' + today.wind.speed + 'MPH'
humidityElement.innerHTML = 'Humidity:' + today.main.humidity + '%'
 
renderForecast(forecast.list)
}

xhttp.open("GET", forecastUrl);
xhttp.send();
}

function renderForecast(forecast){
weatherCards.innerHTML = ''

forecast.forEach((item) => {
    weatherCards.innerHTML += `<li class="card">
	<h3>${item.dt_txt.slice(0,10)}</h3>
    <h4> Temperature:${item.main.temp}°F </h4>
    <h4>Wind:${item.wind.speed}MPH </h4>
    <h4>Humidity:${item.main.humidity}% </h4>
</li>`
})
}

searchButton.addEventListener("click", getCityCoordinates);
