document.getElementById('searchBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value;
  // Bruger wttr.in - gratis vejr API der ikke kræver API nøgle
  const url = `https://wttr.in/${city}?format=j1`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data.current_condition || data.current_condition.length === 0) {
        document.getElementById('output').textContent = 'Kunne ikke finde by.';
      } else {
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = '';

        const current = data.current_condition[0];
        const location = data.nearest_area[0];

        // Clean and simple weather card with grid layout
        outputDiv.innerHTML = `
          <div class="weather-card">
            <div class="weather-grid">
              <div class="info-card main-info">
                <h2>${location.areaName[0].value}</h2>
                <p>${location.region[0].value}, ${location.country[0].value}</p>
                <div class="temp">${current.temp_C}°C</div>
                <div class="feels-like">Føles som ${current.FeelsLikeC}°C</div>
                <div class="description">${current.weatherDesc[0].value}</div>
              </div>
              <div class="info-card detail-card">
                <div class="icon">💧</div>
                <div class="label">Luftfugtighed</div>
                <div class="value">${current.humidity || 'N/A'}%</div>
              </div>
              <div class="info-card detail-card">
                <div class="icon">🌬️</div>
                <div class="label">Vind</div>
                <div class="value">${current.windspeedKmph || 0} km/t ${current.winddir16Point || ''}</div>
              </div>
              <div class="info-card detail-card">
                <div class="icon">🌡️</div>
                <div class="label">Lufttryk</div>
                <div class="value">${current.pressure_MB || current.pressureMillibars || 'N/A'} hPa</div>
              </div>
              <div class="info-card detail-card">
                <div class="icon">👁️</div>
                <div class="label">Sigtbarhed</div>
                <div class="value">${current.visibility || 'N/A'} km</div>
              </div>
              <div class="info-card detail-card">
                <div class="icon">☀️</div>
                <div class="label">UV-indeks</div>
                <div class="value">${current.uvIndex || current.UVIndex || 'N/A'}</div>
              </div>
            </div>
          </div>
        `;
      }
    })
    .catch((error) => {
      console.error('Fejl:', error);
      document.getElementById('output').textContent = `Fejl: ${error.message}`;
    });
});
