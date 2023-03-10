import $api from "@/api/api";

class WeatherServices {
  async getCityWeather(city: string) {
    return await $api.get("", { params: { q: city, units: "metric" } });
  }

  async getWeatherInPoint(lat: number | string, lon: number | string) {
    return await $api.get("", { params: { lat, lon, units: "metric" } });
  }
}

export const weatherServices = new WeatherServices();
