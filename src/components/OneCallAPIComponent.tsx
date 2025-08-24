"use client";
import { OpenWeatherOneCallType } from "@/lib/openWeatherOneCallAPI";
import { useEffect, useState } from "react";
import OneCallCurrentWeather from "./one-call-api/current-weather";
import OneCallAdditionalInfo from "./one-call-api/additional-info";
import OneCallForecast from "./one-call-api/forecast";
import { geoCodingType } from "@/lib/types";
import { frameClass } from "@/data/tw-styles";
import DayTemperatures from "./one-call-api/day-temperatures";

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
        return;
      }
      // check for city not found
      if (city === null) {
        setWeather(null);
        return;
      }
      try {
        // /api/oneCall is my endpoint, created to fetch data with api key
        const uriQuery = `/api/oneCall?lat=${lat ?? gLat}&lon=${lon ?? gLon}`;
        const response = await fetch(uriQuery);
        const weather: OpenWeatherOneCallType = await response.json();
        setWeather(weather);
      } catch (error) {
        setWeather(null);
        console.error("Error on OneCallAPI: ", error); // debugging
      }
    };

    fetchWeather();
    setIsLoading(false);
  }, [city, gCity]);

  /* console.log(
    `weather: ${weather?.current.temp}º, gCity: ${gCity}, city: ${city}`,
  ); // debugging */

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (weather === undefined) {
    return <p className="text-primary text-2xl">Enter a city name</p>;
  } else if (weather === null) {
    return (
      <p className="text-destructive text-2xl">Error fetching weather data.</p>
    );
  }

  return (
    <>
      <OneCallCurrentWeather city={city || gCity} weather={weather} />
      <OneCallAdditionalInfo weather={weather} />
      <DayTemperatures day={weather.daily[selectedDay]} />
      <OneCallForecast
        weather={weather}
        selectedDay={selectedDay}
        onChange={(day) => setSelectedDay(day)}
      />
    </>
  );
}
