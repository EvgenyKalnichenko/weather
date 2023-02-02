export interface ICoord {
  lon: number;
  lat: number;
}

export interface IWind {
  deg: number;
  gust: number;
  speed: number;
}

export interface IWeatherItem {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface IGeoData {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface ISys {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

export interface IWeather {
  base: string;
  clouds: Object;
  cod: number;
  coord: ICoord;
  dt: number;
  id: number;
  main: IGeoData;
  name: string;
  sys: ISys;
  timezone: number;
  visibility: number;
  weather: Array<IWeatherItem>;
  wind: IWind;
}
