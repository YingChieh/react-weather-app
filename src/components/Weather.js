import React from "react";
import moment from "moment";

// to convert kelvin to farenheit, since we get the data from api as kelvin
const kelvinToFarenheit = (k) => {
  return (k - 273.15).toFixed(0);
};
function Weather({ weatherData }) {
  const iconUrl =
    process.env.REACT_APP_ICON_URL + `${weatherData.weather[0].icon}@2x.png`;
  return (
    <>
      <article className="container">
        <div className="weatherData">
          <h2 className="description">{weatherData.weather[0].description}</h2>
          <h3 className="city">
            {weatherData.name + ", " + weatherData.sys.country}
          </h3>
        </div>
        <div className="date">
          {/* Current time */}
          <h5 className="day">{moment().format("D")}</h5>
          <h4 className="month">{moment().format("MMMM")}</h4>
        </div>
        <div className="weatherIcon">
          <span className="temperature">
            {kelvinToFarenheit(weatherData.main.temp)}&deg;C
          </span>
          <img
            src={iconUrl}
            alt="weather status icon"
            className="weather-icon"
          />
        </div>
        {/* <div className="">
          <div className="">
              <h4>Humidity</h4>
              <p>
                {weatherData.main
                  ? Math.round(weatherData.main.humidity)
                  : "N/A"}
              </p>
          </div>
          <div className="">
              <h4>Wind</h4>
              <p>
                {weatherData.wind ? Math.round(weatherData.wind.speed) : "N/A"}
              </p>
          </div>
        </div> */}
      </article>
      <footer>last update: {moment().format("h:mm:ss a")}</footer>
    </>
  );
}

export default Weather;
