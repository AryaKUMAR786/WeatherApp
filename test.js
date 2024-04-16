document.addEventListener("DOMContentLoaded", () => {
    const locationInput = document.getElementById("locationInput");
    const searchButton = document.getElementById("searchButton");
    const weatherInfo = document.getElementById("weatherInfo");

    searchButton.addEventListener("click", () => {
        const location = locationInput.value.trim();
        if (location) {
            getWeather(location);
        } else {
            alert("Please enter a location");
        }
    });

    function getWeather(location) {
        const apiKey = "24c042ddb221c350f496ff5d905baeca"; 
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                showWeather(data);
            })
            .catch(error => {
                console.error("There was a problem fetching the weather data:", error);
                weatherInfo.innerHTML = `<p>Failed to fetch weather data. Please try again later.</p>`;
            });
    }

    function showWeather(data) {
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherDescription = data.weather[0].description;

        weatherInfo.innerHTML = `
            <p>Temperature: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Description: ${weatherDescription}</p>
        `;
    }
});

