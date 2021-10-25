import "./App.css";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Weather from "./components/Weather";
import Feature from "./components/Feature";
import { removeAlert } from "./code";

// To get the weather for a particular location
async function getLocationWeather(location) {
  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl =
    process.env.REACT_APP_API_URL +
    `/weather?q=${location}&appid=${apiKey}&exclude=current&units=metric`;

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

function App() {
  let initLocation = "taipei";
  if (localStorage.getItem("location") !== null) {
    initLocation = localStorage.getItem("location");
  }
  // State
  const [apiData, setApiData] = useState({}); // to store the response
  const [inputState, setInputState] = useState(initLocation); // to store the location name from input field
  const [state, setState] = useState(initLocation); // to store a copy of the getState this will be helpful in updating state on button click
  const inputHandler = (event) => {
    setInputState(event.target.value);
  };
  // to copy the state from inputState to state
  const submitHandler = () => {
    setState(inputState);

    // Store
    if (localStorage.getItem("location") === null) {
      localStorage.setItem("location", inputState);
    } else {
      localStorage.removeItem("location");
      localStorage.setItem("location", inputState);
    }
  };

  // Retrieving the Data
  const getWeather = async () => {
    const result = await getLocationWeather(state);
    setApiData(result);
    console.log(result.data);
  };
  useEffect(() => {
    getWeather();
  }, []);
  useEffect(() => {
    // make the weather to be updated every 10 seconds
    var handle = setInterval(getWeather, 120000);

    return () => {
      clearInterval(handle);
    };
  });

  return (
    <>
      <div className="App">
        <form>
          <input
            type="search"
            className="searchbar transparent"
            placeholder="Enter City..."
            onChange={inputHandler}
          />
          <i className="fas fa-map-marker-alt"></i>
          <button className="search-btn transparent" onClick={submitHandler}>
            GO
          </button>
        </form>
        {apiData.success ? (
          <div className="content">
            <Weather weatherData={apiData.data}></Weather>
            <Feature weatherData={apiData.data}></Feature>
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
