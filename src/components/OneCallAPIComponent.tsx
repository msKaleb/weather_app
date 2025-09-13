"use client";

import { useEffect, useState } from "react";
import { OpenWeatherOneCallType } from "@/lib/openWeatherOneCallAPI";
import { geoCodingType } from "@/lib/types";
import OneCallCurrentWeather from "./one-call-api/current-weather";
import OneCallAdditionalInfo from "./one-call-api/additional-info";
import OneCallForecast from "./one-call-api/forecast";
import DayTemperatures from "./one-call-api/day-temperatures";
import Alerts from "./one-call-api/alerts";

/**
 * @description retrieves weather info from Open Weather API
 */
export default function OneCallAPIComponent({
  city,
  lat,
  lon,
}: {
  city?: string | undefined | null;
  lat: number | null;
  lon: number | null;
}) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);
  const [weather, setWeather] = useState<
    OpenWeatherOneCallType | undefined | null
  >(undefined);
  const [gCity, setGCity] = useState<string | undefined | null>(city);
  const [{ gLat, gLon }, setCoords] = useState<{
    [index: string]: number | null;
  }>({ gLat: lat, gLon: lon });

  // executed on first mount, uses geolocation if allowed ==========================================
  useEffect(() => {
    // if a city is provided, we don't need to geoLocate
    if (city) {
      setGCity(undefined);
      return;
    }

    const getUserPosition = async () => {
      // returns a promise with current location
      const getPosition = () =>
        new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

      try {
        const position = await getPosition();
        // my api endpoint, uses an api key
        const geoCodeReverseQuery = `/api/geoCodeReverse?lat=${
          position.coords.latitude
        }&lon=${position.coords.longitude}`;

        const response = await fetch(geoCodeReverseQuery);
        const geoCodeReverseCity: geoCodingType = await response.json();

        setGCity(`${geoCodeReverseCity.name}, ${geoCodeReverseCity.country}`);
        setCoords({
          gLat: position.coords.latitude,
          gLon: position.coords.longitude,
        });
      } catch (error) {
        if (error instanceof GeolocationPositionError) {
          console.warn(`Geolocation unavailable`);
          setIsLoading(false);
        } else {
          console.error(`Error: ${error}`);
        }
      }
    };
    getUserPosition();
  }, []);

  // executed each time city or gCity (geolocated city) changes ====================================
  useEffect(() => {
    setIsLoading(true);

    const fetchWeather = async () => {
      // check for geolocation
      if (!city && !gCity) {
        setWeather(city as null | undefined);
        setIsLoading(false);
        return;
      }
      // check for city not found
      if (city === null) {
        setWeather(null);
        setIsLoading(false);
        return;
      }
      try {
        // /api/oneCall is my endpoint, created to fetch data with api key
        const uriQuery = `/api/oneCall?lat=${lat ?? gLat}&lon=${lon ?? gLon}`;
        const response = await fetch(uriQuery);
        const weather: OpenWeatherOneCallType = await response.json();
        setWeather(weather);
        setIsLoading(false);
      } catch (error) {
        setWeather(null);
        setIsLoading(false);
        console.error("Error on OneCallAPI: ", error); // debugging
      }
    };

    fetchWeather();
  }, [city, gCity, refreshKey]);

  // invalidate cache and fetch data again =========================================================
  const refreshCache = async () => {
    try {
      await fetch("/api/oneCall/", { method: "POST" });
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error refreshing data: ", error);
    }
  };

  if (isLoading) {
    return <span className="loader"></span>;
  } else if (weather === undefined) {
    return <p className="text-primary text-2xl">Enter a city name</p>;
  } else if (weather === null) {
    return (
      <p className="text-destructive text-2xl">Error fetching weather data.</p>
    );
  }

  return (
    <>
      <OneCallCurrentWeather
        key={refreshKey}
        city={city || gCity}
        weather={weather}
        refreshCache={refreshCache}
      />
      <OneCallAdditionalInfo weather={weather} />
      <Alerts weather={weather} />
      <DayTemperatures day={weather.daily[selectedDay]} />
      <OneCallForecast
        weather={weather}
        selectedDay={selectedDay}
        onChange={(day) => setSelectedDay(day)}
      />
    </>
  );
}
