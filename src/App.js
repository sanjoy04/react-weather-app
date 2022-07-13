import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=a3982203d773d8846c306fc6c2fbcd20`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name === undefined && (
          <p className="err">
            Please enter a location and hit enter to get weather update
          </p>
        )}
        {data.name !== undefined && (
          <div className="bottom">
            <div className="up">
              <div className="feels">
                {data.main ? (
                  <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                ) : null}
                <p className="title">Feels Like</p>
              </div>
              <div className="maxTemp">
                {data.main ? (
                  <p className="bold">{data.main.temp_max.toFixed()}°C</p>
                ) : null}
                <p className="title">Maximun Temp</p>
              </div>
              <div className="minTemp">
                {data.wind ? (
                  <p className="bold">{data.main.temp_min.toFixed()}°C</p>
                ) : null}
                <p className="title">Minimun Temp</p>
              </div>
            </div>
            <div className="down">
              <div className="feels">
                {data.main ? (
                  <p className="bold">{data.main.pressure}hPa</p>
                ) : null}
                <p className="title">Pressure</p>
              </div>
              <div className="humadity">
                {data.main ? (
                  <p className="bold">{data.main.humidity}%</p>
                ) : null}
                <p className="title">Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed.toFixed()}MPH</p>
                ) : null}
                <p className="title">Winds speed</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
