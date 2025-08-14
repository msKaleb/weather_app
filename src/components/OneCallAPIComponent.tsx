"use client";
import { OpenWeatherOneCallType } from "@/lib/openWeatherOneCallAPI";
import { useEffect, useState } from "react";
import { iconDict } from "@/app/dictionary";
// import axios from "axios";
import { TempUnit } from "@/lib/types";
import Image from "next/image";
import rain from "@/assets/wi-raindrop.svg";
import wind from "@/assets/wi-strong-wind.svg";
import Clock from "./clock";
import { useTheme } from "next-themes";

/**
 * @todo windSpeedConversion should depend on units, now hardcoded to 'metric'
 * @todo degrees should be selected by the user, now hardcoded to "°C"
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
  const { resolvedTheme } = useTheme();
  const [weather, setWeather] = useState<
    OpenWeatherOneCallType | undefined | null
  >(undefined);
  const degrees: TempUnit = "°C"; // TODO: to be changed by the user ??
  const windSpeedConversion = 3.6;

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) {
        // console.log("no city"); // debugging
        setWeather(undefined);
        return;
      }
      try {
        // /api/oneCall is my endpoint, created to fetch data with api key
        const uriQuery = `/api/oneCall?lat=${lat}&lon=${lon}`;
        /* const { data }: { data: OpenWeatherOneCallType } =
          await axios.get(uriQuery); 
        setWeather(data); */

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
  const currentWeather = weather?.current.weather[0];
  const iconClass = `wi ${iconDict[currentWeather.icon] || "wi-na"}`;
  const days = weather.daily;
  const cityDate = new Date(weather.current.dt * 1000);
  // use 'city?.split(", ")[1]' as locale for city's own locale

  return (
    <>
      {/* current weather */}
      <div className="flex flex-col items-center gap-4 sm:min-w-60 sm:flex-row sm:justify-around">
        <i className={`${iconClass} weather-icon`}></i>
        <div>
          <h1 className="text-2xl font-bold">{city}</h1>
          <h2 className="text-xl font-bold">
            {cityDate.toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "2-digit",
            })}
          </h2>
          <p className="text-4xl">
            {weather.current.temp.toFixed(1)}
            {degrees}
          </p>
          <Clock
            timeZone={weather.timezone}
            locale={navigator.language || city?.split(", ")[1]}
          />
          <h2 className="text-2xl font-bold">{currentWeather.description}</h2>
        </div>
      </div>

      {/* additional info */}
      <div className="border-foreground m-4 flex w-[90%] gap-4 rounded-2xl border p-4 sm:max-w-[400px]">
        <div className="w-2/4 rounded-2xl p-2">
          <p>Precipitation</p>
          <span className="text-4xl font-bold">
            {weather.minutely && weather.minutely[0].precipitation > 0
              ? weather.minutely[0].precipitation.toFixed(1)
              : 0}
          </span>
          mm/h
        </div>
        <div className="w-2/4 rounded-2xl p-2">
          <p>Wind speed</p>
          <span className="text-4xl font-bold">
            {(weather.current.wind_speed * windSpeedConversion).toFixed(1)}
          </span>
          km/h
        </div>
      </div>

      {/* forecast for the next days */}
      <div className="border-foreground m-4 flex w-[90%] flex-col gap-4 rounded-2xl border px-4 py-4 sm:max-w-[600px] lg:max-w-[800px] lg:min-w-[400px]">
        <h2 className="pl-4 text-xl font-bold">Forecast for the next days</h2>
        <ul className="flex gap-4 overflow-auto sm:mx-auto sm:grid sm:grid-cols-3 sm:items-center lg:grid-cols-4">
          {days.map((day) => {
            const date = new Date(day.dt * 1000);
            const tempMin = Math.round(day.temp.min || NaN);
            const tempMax = Math.round(day.temp.max || NaN);

            return (
              <li
                key={day.dt}
                className="border-foreground flex w-20 flex-shrink-0 flex-col items-center justify-between gap-4 rounded-2xl border p-4 sm:w-40"
              >
                {/* weather icon */}
                <div className="p-2">
                  <i
                    className={`wi weather-icon-min ${
                      iconDict[day.weather[0].icon] || "wi-na"
                    }`}
                  />{" "}
                </div>
                {/* wind speed, rain likelihood and temperature */}
                <div className="flex w-full flex-col items-center gap-1">
                  {/* <p className="text-center">
                    {tempMin}°<span className="hidden sm:inline"> / </span>{" "}
                    {tempMax}°
                  </p> */}
                  <div className="gap-2 sm:flex">
                    <p>
                      <span className="inline sm:hidden">↓ </span>
                      {tempMin}°
                    </p>
                    <span className="hidden sm:inline"> / </span>
                    <p>
                      <span className="inline sm:hidden">↑ </span>
                      {tempMax}°
                    </p>
                  </div>

                  <div className="hidden w-full gap-1 sm:flex">
                    <div
                      className={`${resolvedTheme === "dark" && "svg-dark"} w-1/4`}
                    >
                      <Image
                        color="white"
                        className=""
                        alt="wind"
                        src={wind}
                        width={40}
                      />
                    </div>
                    <div className="w-3/4 text-end">
                      {(day.wind_speed * windSpeedConversion).toFixed(1) || 0}{" "}
                      km/h
                    </div>
                  </div>
                  <div className="hidden w-full gap-1 sm:flex">
                    <div
                      className={`${resolvedTheme === "dark" && "svg-dark"} w-1/4`}
                    >
                      <Image className="" alt="rain" src={rain} width={50} />
                    </div>
                    <div className="w-3/4 text-end">{day.rain || 0} mm/h</div>
                  </div>
                </div>
                {/* date */}
                <div className="">
                  <p className="text-center">
                    {date.toLocaleDateString(undefined, { weekday: "short" })}
                  </p>
                  <p className="text-center text-[0.9rem]">
                    {date.toLocaleDateString(undefined, {
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
