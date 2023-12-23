import { useEffect, useState } from "react";
import weatherService from "../services/weather";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!capital) return;
    weatherService.getWeatherByCity(capital).then((response) => {
      setWeather(response);
    });
  }, [capital]);

  if (!weather || !capital) return null;
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature {weather?.main?.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
      />
      <p>wind {weather?.wind?.speed} m/s</p>
    </div>
  );
};

export default Weather;
