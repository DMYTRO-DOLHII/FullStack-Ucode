const apiKey = 'e36f08f75cef4ed68b0537fcbb2a1166';
const daysToShow = 30;
let cityName = "Erlangen";

const forecastElement = document.getElementById('forecast');
const cityElement = document.getElementById('city-name');

function getWeatherForecast(city) {
	const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
	fetch(url)
		.then((response) => response.json())
		.then((data) => displayWeatherForecast(data))
		.catch((error) => console.error(error));
}

function displayWeatherForecast(weatherData) {
	const days = weatherData.list.slice(0, daysToShow);
	console.log(days)
	const forecastHTML = days
		.map(
			(day) => `
    <div class="day">
      <h2>${new Date(day.dt * 1000).toLocaleDateString()} <br> ${new Date(day.dt * 1000).getHours()}:00</h2>
      <img
        src="${(() => {
					if (day.weather[0].description.includes("sky")) {
						return "https://cdn-icons-png.flaticon.com/512/7084/7084512.png";
					} else if (day.weather[0].description.includes("cloud")) {
						return "https://cdn-icons-png.flaticon.com/512/5903/5903939.png";
					} else if (day.weather[0].description.includes("rain")) {
						return "https://cdn-icons-png.flaticon.com/512/4150/4150904.png";
					}
					return "https://www.flaticon.com/free-icon/sun_10912486";
				})()}"
        alt="${day.weather[0].description}"
      />
      <p>${day.main.temp}°C</p>
    </div>
  `
		)
		.join('');
	forecastElement.innerHTML = forecastHTML;
	cityElement.innerHTML = `<h2>${cityName}</h2>`;
}

document.getElementById('weather').addEventListener('click', function () {
	cityName = document.getElementById("city-input").value;
	getWeatherForecast(cityName);
});

getWeatherForecast(cityName);