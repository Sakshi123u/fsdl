const apiKey = '2f13cd393a89436fa74164350251101'; 
let weatherChart;

async function getWeatherData(city = 'Athens') {
    try {
        // WeatherAPI uses a single endpoint for current AND forecast (days=1 for hourly)
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) throw new Error(data.error.message);

        updateUI(data);
    } catch (error) {
        console.error("Error:", error);
        alert("City not found or API error.");
    }
}

function updateUI(data) {
    // 1. Update Clock Card
    document.getElementById('cityName').innerText = data.location.name;
    document.getElementById('currentTime').innerText = data.location.localtime.split(' ')[1];
    document.getElementById('currentDate').innerText = new Date(data.location.localtime).toLocaleDateString('en-GB', { 
        weekday: 'long', day: 'numeric', month: 'short' 
    });

    // 2. Update Main Weather Card
    document.querySelector('.temp-big').innerText = `${Math.round(data.current.temp_c)}°C`;
    document.querySelector('.text-dim').innerText = `Feels like: ${Math.round(data.current.feelslike_c)}°C`;
    
    // Update Description and Icon
    document.querySelector('.main-weather-card h3').innerText = data.current.condition.text;
    document.querySelector('.main-weather-card i.fa-5x').className = `fas fa-cloud-sun fa-5x`; // Simplified for now

    // 3. Update Details Grid
    const details = document.querySelector('.details-grid').children;
    details[0].innerHTML = `<i class="fas fa-droplet"></i> ${data.current.humidity}%<br><small>Humidity</small>`;
    details[1].innerHTML = `<i class="fas fa-wind"></i> ${data.current.wind_kph}km/h<br><small>Wind Speed</small>`;
    details[2].innerHTML = `<i class="fas fa-gauge-high"></i> ${data.current.pressure_mb}hPa<br><small>Pressure</small>`;
    details[3].innerHTML = `<i class="fas fa-sun"></i> ${data.current.uv}<br><small>UV Index</small>`;

    // 4. Update Hourly Chart (Next 6 hours)
    const hourlyData = data.forecast.forecastday[0].hour.slice(0, 8);
    const labels = hourlyData.map(h => h.time.split(' ')[1]);
    const temps = hourlyData.map(h => h.temp_c);
    
    renderHourlyChart(labels, temps);
}

function renderHourlyChart(labels, temps) {
    const ctx = document.getElementById('hourlyChart').getContext('2d');
    if (weatherChart) weatherChart.destroy();

    weatherChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: temps,
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { display: false },
                x: { ticks: { color: '#b0b0b0' }, grid: { display: false } }
            }
        }
    });
}

// Search Functionality
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeatherData(e.target.value);
    }
});

// Initial Load
getWeatherData();