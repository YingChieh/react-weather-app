import "./App.css";
import React, { useEffect, useState } from "react";
import Weather from "./components/Weather";

// To get the weather for a particular location
async function getLocationWeather(location) {
  // API KEY AND URL
  const apiKey = process.env.REACT_APP_API_KEY;
  const apiUrl =
    process.env.REACT_APP_API_URL +
    `/weather?q=${location}&exclude=current&appid=${apiKey}`;

  try {
    const result = await fetch(apiUrl);

    // the API call has succeeded
    if (result.status === 200) {
      return { success: true, data: await result.json() };
    }

    return { success: false, error: result.statusText };
  } catch (ex) {
    return { success: false, error: ex.message };
  }
}

function App() {
  // State
  const [apiData, setApiData] = useState({}); // to store the response
  const [inputState, setInputState] = useState("taipei"); // to store the location name from input field
  const [state, setState] = useState("taipei"); // to store a copy of the getState this will be helpful in updating state on button click
  useEffect(() => {
    // Retrieving the Data
    const getWeather = async () => {
      const result = await getLocationWeather(state);
      setApiData(result);
      // console.log(result.data);
    };

    // the weather to be updated every 10 seconds
    var handle = setInterval(getWeather, 10000);

    return () => {
      clearInterval(handle);
    };
  }, [state]);
  return (
    <div className="App">
      {apiData.success ? (
        <Weather weatherData={apiData.data}></Weather>
      ) : (
        <div>{apiData.error}</div>
      )}
    </div>
  );
}

export default App;
