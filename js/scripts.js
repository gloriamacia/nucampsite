console.log('javascript connected!');
    
const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 5000,
    pause: false
})

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function () {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        carousel.cycle();
    }
})   

async function fetchWeather() {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    console.log(apiKey)
    const city = 'Barcelona';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching the weather data:', error);
    }
}

function displayWeather(data){
    console.log(data.main.temp);
    console.log(data.weather[0].description);
    console.log(data.weather[0].icon);

    // select DOM elements
    const weatherIcon = document.getElementById("weather-icon");
    const weatherTemp = document.getElementById("weather-temp");
    const weatherDescription = document.getElementById("weather-description");
    const weatherCity = document.getElementById("weather-city");

    const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const iconImg = document.createElement("img");
    iconImg.src = iconUrl;
    iconImg.alt = "Weather Icon";
    weatherIcon.appendChild(iconImg); 

    // temperature (including degree symbol)
    weatherTemp.textContent = `${data.main.temp} \u00B0C`;

    // Set weather description text content
    weatherDescription.textContent = data.weather[0].description;

    weatherCity.textContent = `in ${data.name}`;

    // Ensure weather container is displayed (remove 'd-none' class)
    const weatherContainer = document.getElementById("weather");
    weatherContainer.classList.remove("d-none");
}

fetchWeather();
