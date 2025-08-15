"use client";
import { OpenWeatherOneCallType } from "@/lib/openWeatherOneCallAPI";
import { useEffect, useState } from "react";
import OneCallCurrentWeather from "./one-call-api/current-weather";
import OneCallAdditionalInfo from "./one-call-api/additional-info";
import OneCallForecast from "./one-call-api/forecast";

/**
 * @description retrieves weather info from Open Weather API
 */
export default function OneCallAPIComponent({
  city,
  lat,
  lon,
}: {
  city?: string | undefined;
  lat: number | null;
  lon: number | null;
}) {
  const [weather, setWeather] = useState<
    OpenWeatherOneCallType | undefined | null
  >(undefined);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) {
        setWeather(undefined);
        return;
      }
      try {
        // /api/oneCall is my endpoint, created to fetch data with api key
        const uriQuery = `/api/oneCall?lat=${lat}&lon=${lon}`;
        const response = await fetch(uriQuery);
        const weather: OpenWeatherOneCallType = await response.json();
        setWeather(weather);
      } catch (error) {
        setWeather(null);
        // console.error("Error on OneCallAPIComponent useEffect()!", error); // debugging
      }
    };

    fetchWeather();
  }, [city]);

  if (weather === undefined) {
    return <p className="text-primary text-2xl">Enter a city name</p>;
  } else if (weather === null) {
    return (
      <p className="text-destructive text-2xl">Error fetching weather data.</p>
    );
  }
  const days = weather.daily;
  const cityDate = new Date(weather.current.dt * 1000);
  // use 'city?.split(", ")[1]' as locale for city's own locale

  return (
    <>
      <OneCallCurrentWeather city={city} weather={weather} />
      <OneCallAdditionalInfo weather={weather} />
      <OneCallForecast weather={weather} />
    </>
  );
}
