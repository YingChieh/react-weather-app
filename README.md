## OpenWeatherMap API

The application uses the [OpenWeatherMap API](https://openweathermap.org/). In order to use this API you will need to sign up for an account (the service that the application uses is available on the free tier) and set the API key as the `REACT_APP_WEATHER_API_KEY` environment variable.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# react-weather-app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features
- Mobile friendly
- User's ability to search cities
  * A text input so that user can search for a city by its name
  * Able to add current city search to history, so user can see the weather of the last selected cities if refresh the page (in maximum: 5 cities)
- View weather results
  * Handle possible API's erros by showing a message
  * Click `I want to know more ▼` for more weather details
  * The weather to be updated every 10 seconds
  * After refreshing the page, show the last viewed city weather
  * Show the localtime
- Located current city for API results
  * If an end user grants permission, the Geolocation API: Supports "one-shot" position updates via the getCurrentPosition() method

## Tech Features
- You’ll need to have Node >= 10.16.3 and npm >= 6.14.8 on your machine.
- Bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)
- Uses React for rendering components
- fontawesome for icons 
- Uses [moment.js](https://momentjs.com/) to format our time
- Uses [Google Places API](https://developers.google.com/places/web-service/intro) for location autocomplete
- Use HTML Geolocation API to get the geographical position of a user

## Architecture

The architecture of the app looks like this:

```
App.js
|___Search bar
|  |__Input field
|  |__Button (current loctation icon)
|  |__Button
|___Content
|  |__ListContainer
|  | |__Button (history icon)
|  |__weatherData
|  | |__Local time
|  | |__City
|  | |__Date
|  | |__Temperature
|  | |__WeatherIcon
|  | |__Description
|  |_Weather details
|    |__Cloudines
|    |__Feels like
|    |__Humidity
|    |__Wind
|    |__Sunrise
|    |__Sunset
|___Footer

