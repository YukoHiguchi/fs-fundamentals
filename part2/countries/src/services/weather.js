import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeatherByCity = (cityname) => {
  const request = axios.get(
    `${baseUrl}/?q=${cityname}&units=metric&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`
  );
  return request.then((response) => response.data);
};
export default {
  getWeatherByCity,
};
