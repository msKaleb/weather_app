"use client";
import { OpenWeatherOneCallType } from "@/lib/openWeatherOneCallAPI";
import { useEffect, useState } from "react";
import OneCallCurrentWeather from "./one-call-api/current-weather";
import OneCallAdditionalInfo from "./one-call-api/additional-info";
import OneCallForecast from "./one-call-api/forecast";
import { geoCodingType } from "@/lib/types";

/**
 * @todo change placeholder for a frame with relevant data
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
  const [selectedDay, setSelectedDay] = useState(0);
  const [weather, setWeather] = useState<
    OpenWeatherOneCallType | undefined | null
  >(undefined);
  const [gCity, setGCity] = useState<string | undefined | null>(city);
  const [{ gLat, gLon }, setCoords] = useState<{
    [index: string]: number | null;
  }>({ gLat: lat, gLon: lon });

  useEffect(() => {
    // if a city is provided, we don't need to geoLocate
    if (city) {
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

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city && !gCity) {
        setWeather(city as null | undefined);
        return;
      }
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
        console.error("Error on OneCallAPIComponent useEffect()!", error); // debugging
      }
    };

    fetchWeather();
  }, [city, gCity]);

  if (weather === undefined) {
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
      {/* this is a placeholder */}
      <p className="text-center">
        <span className="font-bold">
          {new Date(weather.daily[selectedDay].dt * 1000).toLocaleString(
            undefined,
            { dateStyle: "medium" },
          )}
        </span>
        : {weather.daily[selectedDay].summary}
      </p>
      <OneCallForecast
        weather={weather}
        selectedDay={selectedDay}
        onChange={(day) => setSelectedDay(day)}
      />
    </>
  );
}
