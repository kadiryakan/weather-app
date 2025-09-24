const key = "KEY HERE";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

const getWeatherImage = (weatherMain) => {
  const weatherImages = {
    Clouds: "img/clouds.png",
    Clear: "img/clear.png",
    Sunny: "img/clear.png",
    Rain: "img/rain.png",
    Drizzle: "img/drizzle.png",
    Snow: "img/snow.png",
    Mist: "img/mist.png",
    Haze: "img/mist.png",
    Fog: "img/mist.png",
  };

  return weatherImages[weatherMain] || "img/clear.png";
};

const fetchWeather = async (city) => {
  const response = await fetch(`${url}${city}&appid=${key}`);
  const data = await response.json();
  changeStatus(data);
};

const changeStatus = (data) => {
  const existingWeatherInfo = document.querySelector(".weatherInfo");
  if (existingWeatherInfo) {
    existingWeatherInfo.remove();
  }

  const div = document.createElement("div");
  div.classList.add("weatherInfo");

  div.style.opacity = "0";
  div.style.transform = "translateY(30px) scale(0.9)";
  div.style.transition = "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

  const weatherImageSrc = getWeatherImage(data.weather[0].main);

  div.innerHTML = `
  <img class="weatherIcon" src="${weatherImageSrc}" alt="${
    data.weather[0].main
  }" />
        <h1 class="temp">${Math.round(data.main.temp)}°C</h1>
        <h2 class="city">${data.name}</h2>
        <div class="info">
          <div class="col">
            <i class="fa-solid fa-tornado"></i>
            <div>
              <p class="humidity">${data.main.humidity}%</p>
              <p class="status">Humidity</p>
            </div>
          </div>
          <div class="col">
            <i class="fa-solid fa-wind"></i>
            <div>
              <p class="wind">${data.wind.speed} km/h</p>
              <p class="status">Wind</p>
            </div>
          </div>
        </div>`;

  document.querySelector(".card").appendChild(div);

  setTimeout(() => {
    div.style.opacity = "1";
    div.style.transform = "translateY(0) scale(1)";
  }, 50);
};

searchButton.addEventListener("click", () => {
  fetchWeather(searchInput.value);
});

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    fetchWeather(searchInput.value);
  }
});
