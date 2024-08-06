import "./App.css";
import { useState } from "react";
import Search from "./components/Search/Search";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./Api";
import Forecast from "./components/Forecast/Forecast";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    );

    try {
      const [weatherResponse, forecastResponse] = await Promise.all([
        currentWeatherFetch.then((response) => response.json()),
        forecastFetch.then((response) => response.json()),
      ]);

      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForecast({ city: searchData.label, ...forecastResponse });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2 className="head-title">A Weather App</h2>
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
    </>
  );
};

export default App;
