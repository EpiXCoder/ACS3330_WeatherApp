import React, { useState } from 'react';
import DisplayWeather from './DisplayWeather';
import './Weather.css';

function Weather() {
  const [zip, setZip] = useState('');
  const [unit, setUnit] = useState('metric');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=metric&appid=${apiKey}`;


    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod !== 200) {
        throw new Error('Failed to fetch weather data');
      }
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const handleGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByGeoLocation(latitude, longitude);
      }, (error) => {
        setError("Geolocation is not supported by this browser or permission denied.");
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const fetchWeatherByGeoLocation = async (lat, lon) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod !== 200) {
        throw new Error(data.message || 'Failed to fetch weather data');
      }
      setWeatherData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };
  
  

  return (
    <div>
      <h1>Weather Now</h1>
      <div className="weather-container">
        <form onSubmit={handleSubmit}>
            <input 
            className="weather-input"
            type="text" 
            value={zip} 
            onChange={(e) => setZip(e.target.value)} 
            pattern="\d{5}" 
            title="Enter a 5-digit zip code" 
            placeholder="Enter your zip" 
            required
            />
            <select className="weather-select" value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
            <option value="standard">Standard</option>
            </select>
            <button type="submit" className="weather-button">Get Weather</button>
        </form>
        <button className="weather-button-geo" type="button" onClick={handleGeoLocation}>Use My Location</button>

        {weatherData && <DisplayWeather data={weatherData} />}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Weather;
