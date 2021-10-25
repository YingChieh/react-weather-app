import React from "react";
import moment from "moment";
import { obtainTimeFromCity } from "../code";

function Weather({ weatherData }) {
  const iconUrl =
    process.env.REACT_APP_ICON_URL + `${weatherData.weather[0].icon}@2x.png`;
  const cityTime = obtainTimeFromCity(weatherData.dt, weatherData.timezone);
  return (
    <>
      <article className="container">
        <div className="weatherData">
          <h3 className="citytime">{cityTime.toLocaleTimeString("en-IN")}</h3>
          <h3 className="city">
            {weatherData.name + ", " + weatherData.sys.country}
          </h3>
        </div>
        <div className="date">
          {/* Current time */}
          <h5 className="day">{moment(cityTime).format("D")}</h5>
          <h4 className="month">{moment(cityTime).format("MMMM")}</h4>
        </div>
        <div className="weatherIcon">
          <span className="temperature">
            {weatherData.main ? Math.round(weatherData.main.temp) : "N/A"}
          </span>
          <img
            src={iconUrl}
            alt="weather status icon"
            className="weather-icon"
          />
          <h2 className="description">
            {weatherData.weather ? weatherData.weather[0].description : "N/A"}
          </h2>
        </div>
      </article>
    </>
  );
}

export default Weather;
