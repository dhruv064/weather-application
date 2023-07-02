import React, { useState } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = '66f919c0c8ba1549c8957db9b0ad210a'; 

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
      setError('');
    } catch (error) {
      setWeather(null);
      setError('Error fetching weather data. Please try again.');
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeather();
  };

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
        return <WiDaySunny />;
      case '01n':
        return <WiDaySunny />;
      case '02d':
        return <WiCloud />;
      case '02n':
        return <WiCloud />;
      case '03d':
      case '03n':
        return <WiCloud />;
      case '04d':
      case '04n':
        return <WiCloud />;
      case '09d':
      case '09n':
        return <WiRain />;
      case '10d':
      case '10n':
        return <WiRain />;
      case '11d':
      case '11n':
        return <WiThunderstorm />;
      case '13d':
      case '13n':
        return <WiSnow />;
      case '50d':
      case '50n':
        return <WiFog />;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Weather App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Enter city name" value={city} onChange={handleCityChange} />
          <button className="btn btn-primary" type="submit">Get Weather</button>
        </div>
      </form>

      {weather && (
        <div className="card">
          <div className="card-body">
            <h3 className="text-center">{weather.name}, {weather.sys.country}</h3>
            <div className="d-flex align-items-center justify-content-center">
              <div className="weather-icon">{getWeatherIcon(weather.weather[0].icon)}</div>
              <div className="weather-info">
                <p className="mb-1">{weather.weather[0].description}</p>
                <p className="mb-1">Temperature: {weather.main.temp}°C</p>
                <p className="mb-1">Humidity: {weather.main.humidity}%</p>
                <p className="mb-0">Wind Speed: {weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default App;
