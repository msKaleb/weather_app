type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Precipitation = {
  "1h"?: number; // mm
};

type TemperatureSet = {
  morn?: number;
  day?: number;
  eve?: number;
  night?: number;
  min?: number;
  max?: number;
};

type Alert = {
  sender_name: string;
  event: string;
  start: number;
  end: number;
  description: string;
  tags: string[];
};

export type DailyForecast = {
  dt: number;
  sunrise?: number;
  sunset?: number;
  moonrise: number;
  moonset: number;
  moon_phase: number; // 0-1
  summary: string;
  temp: TemperatureSet;
  feels_like: Omit<TemperatureSet, "min" | "max">;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  clouds: number;
  uvi: number;
  pop: number; // 0-1 probability
  rain?: number; // mm
  snow?: number; // mm
  weather: WeatherCondition[];
};

export type MinutelyForecast = {
  dt: number;
  precipitation: number; // mm/h
};

export type HourlyForecast = {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  pop: number; // 0-1 probability
  rain?: Precipitation;
  snow?: Precipitation;
  weather: WeatherCondition[];
};

export type CurrentForecast = {
  dt: number; // Current time, Unix, UTC
  sunrise?: number; // optional for polar regions
  sunset?: number; // optional for polar regions
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number; // meters (max 10000)
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  rain?: Precipitation;
  snow?: Precipitation;
  weather: WeatherCondition[];
};

export type OpenWeatherOneCallType<
  U extends "standard" | "metric" | "imperial" = "metric",
> = {
  lat: number; // (-90 to 90)
  lon: number; // (-180 to 180)
  timezone: string;
  timezone_offset: number; // seconds from UTC

  // Current weather data API response
  current: CurrentForecast;

  minutely?: MinutelyForecast[];

  hourly: HourlyForecast[];

  daily: DailyForecast[];

  alerts?: Alert[];
} & (U extends "metric"
  ? {
      units: {
        temp: "°C";
        feels_like: "°C";
        dew_point: "°C";
        wind_speed: "m/s";
        precipitation: "mm";
      };
    }
  : U extends "imperial"
    ? {
        units: {
          temp: "°F";
          feels_like: "°F";
          dew_point: "°F";
          wind_speed: "mph";
          precipitation: "mm";
        };
      }
    : {
        units: {
          temp: "K";
          feels_like: "K";
          dew_point: "K";
          wind_speed: "m/s";
          precipitation: "mm";
        };
      });
