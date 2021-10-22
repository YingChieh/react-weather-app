import React from "react";
// to convert kelvin to farenheit, since we get the data from api as kelvin
const kelvinToFarenheit = (k) => {
  return (k - 273.15).toFixed(2);
};
function Weather({ weatherData }) {
  return (
    <div>
      <p className="h2">{kelvinToFarenheit(weatherData.main.temp)}&deg; C</p>
    </div>
  );
}

export default Weather;
