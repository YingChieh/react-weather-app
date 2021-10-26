import React from "react";
import { obtainTimeFromCity } from "../code";

function Feature({ weatherData }) {
  const displayMore = () => {
    var x = document.getElementById("more");
    var btn = document.getElementById("btnMore");
    if (x.style.display === "block") {
      x.style.display = "none";
      btn.textContent = "I want to know more ▼";
    } else {
      x.style.display = "block";
      btn.textContent = "Hide info ▲";
    }
  };
  const sunriseTime = obtainTimeFromCity(
    weatherData.sys.sunrise,
    weatherData.timezone
  );
  const sunsetTime = obtainTimeFromCity(
    weatherData.sys.sunset,
    weatherData.timezone
  );
  return (
    <>
      <div className="extra-info">
        <button id="btnMore" onClick={displayMore}>
          I want to know more ▼
        </button>
      </div>
      <div className="container more row" id="more">
        <div className="col">
          <ul className="weather">
            <li>
              <i className="fas fa-cloud"></i>
              Cloudines:{" "}
              <span>{weatherData.clouds ? weatherData.clouds.all : "N/A"}</span>
              %
            </li>
            <li>
              <i className="fas fa-thermometer-half"></i>
              Feels like:{" "}
              <span>
                {weatherData.main
                  ? Math.round(weatherData.main.feels_like)
                  : "N/A"}
              </span>
              &deg;C
            </li>
            <li>
              <i className="fas fa-tint"></i>
              Humidity:{" "}
              <span>
                {weatherData.main
                  ? Math.round(weatherData.main.humidity)
                  : "N/A"}
              </span>
              %
            </li>
          </ul>
        </div>
        <div className="col">
          <ul className="weather">
            <li>
              <i className="fas fa-wind"></i>
              Wind:{" "}
              <span>
                {weatherData.wind ? weatherData.wind.speed.toFixed(2) : "N/A"}
              </span>
              m/s
            </li>
            <li>
              <i className="far fa-sun"></i>
              Sunrise: <span>{sunriseTime.toLocaleTimeString("en-IN")}</span>
            </li>
            <li>
              <i className="fas fa-sun"></i>
              Sunset: <span>{sunsetTime.toLocaleTimeString("en-IN")}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Feature;
