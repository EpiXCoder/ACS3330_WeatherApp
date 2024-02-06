import React from 'react';

function DisplayWeather({ data }) {
    const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  
    return (
      <div className="weather-info">
        <h2>Weather in {data.name}</h2>
        <img src={iconUrl} alt={data.weather[0].description} className="weather-icon" />
        <p>Temperature: {data.main.temp}°</p>
        <p>Description: {data.weather[0].description}</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Pressure: {data.main.pressure} hPa</p>
        <p>Wind Speed: {data.wind.speed} meter/sec</p>
      </div>
    );
  }

export default DisplayWeather;
