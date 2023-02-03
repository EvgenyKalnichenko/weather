import axios from "axios";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const KEY_API = "1049d47c1f681e1591ae1134008c4dd0";

const $api = axios.create({
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.params.appid = KEY_API;
  config.params.lang = "en";
  return config;
});

export default $api;
