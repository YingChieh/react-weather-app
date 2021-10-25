// to convert kelvin to farenheit, since we get the data from api as kelvin
export const kelvinToFarenheit = (k) => {
  return (k - 273.15).toFixed(0);
};

export const obtainTimeFromCity = (localDt, offset) => {
  const d = new Date(localDt * 1000);
  const localTime = d.getTime();
  const localOffset = d.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  var atlanta = utc + 1000 * offset;
  return new Date(atlanta);
};

export const removeAlert = () => {
  document.getElementById("alert").style.display = "none";
};
