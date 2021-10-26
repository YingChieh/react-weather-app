import "./App.css";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Weather from "./components/Weather";
import Feature from "./components/Feature";
import { removeAlert } from "./code";

function App() {
  let initLocation = "taipei";
  if (localStorage.getItem("location") !== null) {
    initLocation = localStorage.getItem("location");
  }
  // State
  const [apiData, setApiData] = useState({}); // to store the response
  const [inputState, setInputState] = useState(initLocation); // to store the location name from input field

  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const url = process.env.REACT_APP_API_URL;
  const [apiUrl, setApiUrl] = useState(
    `${url}/weather?q=${initLocation}&appid=${apiKey}&exclude=current&units=metric`
  );
  var initHistory = [];
  if (localStorage.getItem("history") !== null) {
    initHistory = localStorage.getItem("history").split(",");
  }
  const [cityHistory, setCityHistory] = useState(initHistory);

  const inputHandler = (event) => {
    setInputState(event.target.value);
  };
  // to copy the state from inputState to state
  const submitHandler = () => {
    setApiUrl(
      `${url}/weather?q=${inputState}&appid=${apiKey}&exclude=current&units=metric`
    );
  };

  const currentLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      setApiUrl(
        `${url}/weather?lat=${lat}&lon=${long}&appid=${apiKey}&exclude=current&units=metric`
      );
    });
  };

  const onSetHistory = (city) => {
    console.log(cityHistory);
    setCityHistory(cityHistory.slice(-4).concat(city));
    // Store
    if (localStorage.getItem("history") === null) {
      localStorage.setItem("history", cityHistory.slice(-4).concat(city));
    } else {
      localStorage.removeItem("history");
      localStorage.setItem("history", cityHistory.slice(-4).concat(city));
    }
  };

  useEffect(() => {
    // To get the weather for a particular location
    async function getLocationWeather() {
      try {
        const result = await fetch(apiUrl);

        // the API call has succeeded
        switch (result.status) {
          case 200:
            return { success: true, data: await result.json() };
          case 401:
            return {
              success: false,
              error: "Your API key is not activated",
            };
          case 404:
            return {
              success: false,
              error: "Your searched a wrong city name",
            };
          case 429:
            return {
              success: false,
              error:
                "Please consider upgrading to a subscription plan that meets your needs or reduce the number of API calls in accordance with the limits. (less than 60 API calls per minute)",
            };
          default:
            return { success: false, error: result.statusText };
        }
      } catch (ex) {
        return { success: false, error: ex.message };
      }
    }
    // Retrieving the Data
    const getWeather = async () => {
      const result = await getLocationWeather();
      setApiData(result);
      var inputEle = document.getElementsByClassName("searchbar")[0];
      inputEle.value = result.data.name;
      // Store
      if (localStorage.getItem("location") === null) {
        localStorage.setItem("location", result.data.name);
      } else {
        localStorage.removeItem("location");
        localStorage.setItem("location", result.data.name);
      }
    };
    getWeather();
    // make the weather to be updated every 10 seconds
    var handle = setInterval(getWeather, 120000);

    return () => {
      clearInterval(handle);
    };
  }, [apiUrl]);

  return (
    <>
      <div className="App">
        <div>
          <input
            type="search"
            className="searchbar transparent"
            placeholder="Enter City..."
            onChange={inputHandler}
          />
          <i className="fas fa-map-marker-alt" onClick={currentLocation}></i>
          <button className="search-btn transparent" onClick={submitHandler}>
            GO
          </button>
        </div>
        {apiData.success ? (
          <div className="content">
            <div className="ListContainer">
              <i
                className="fas fa-history"
                onClick={() => {
                  var x = document.getElementById("history");
                  if (x.style.display === "flex") {
                    x.style.display = "none";
                  } else {
                    x.style.display = "flex";
                  }
                }}
              ></i>
              <div id="history">
                {cityHistory.length > 0 ? (
                  cityHistory.map((city, i) => (
                    <div
                      key={i}
                      className="List"
                      onClick={() =>
                        setApiUrl(
                          `${url}/weather?q=${city}&appid=${apiKey}&exclude=current&units=metric`
                        )
                      }
                    >
                      {city}
                    </div>
                  ))
                ) : (
                  <div className="noneHistory">No History</div>
                )}
              </div>
            </div>
            <Weather weatherData={apiData.data}></Weather>
            <Feature weatherData={apiData.data}></Feature>

            <button
              className="addList"
              onClick={() => onSetHistory(apiData.data.name)}
            >
              +
            </button>
          </div>
        ) : (
          <div className="content alert" id="alert">
            <span className="closebtn" onClick={removeAlert}>
              &times;
            </span>
            <i className="fas fa-exclamation-circle"></i> {apiData.error}
          </div>
        )}
      </div>

      <footer>
        <small>
          <div>last updated: {moment().format("D MMMM YYYY h:mm:ss a")}</div>
          <div>created by Ying-Chieh Chen</div>
        </small>
      </footer>
    </>
  );
}

export default App;
