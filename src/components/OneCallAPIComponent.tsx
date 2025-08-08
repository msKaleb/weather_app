"use client";
import { OpenWeatherOneCallType } from "@/lib/openWeatherOneCallAPI";
import { useEffect, useState } from "react";
import { iconDict } from "@/app/dictionary";
import axios from "axios";
import { TempUnit } from "@/lib/utils";

// import { geoCodingType } from "@/lib/utils";
// import { fetchOpenWeatherOneCallAPI } from "@/lib/actions";

// =================================================================================================
//                                     server component version
// =================================================================================================
/* export default async function OneCallAPIComponent({
  city,
}: {
  city?: string | undefined;
}) {
  if (!city) {
    return <p>No city</p>;
  }
  const data: OpenWeatherOneCallType | null = await fetchOpenWeatherOneCallAPI(
    city
  );
  if (!data) {
    return (
      <p className="text-red-500 text-2xl">Error fetching weather data.</p>
    );
  }

  const currentWeather = data.current.weather[0]
  const iconClass = `wi ${iconDict[currentWeather.icon] || "wi-na"}`;
  return (
    <>
      <div className="flex flex-col gap-4 items-center sm:flex-row sm:min-w-60 sm:justify-around">
        <i className={`${iconClass} weather-icon`}></i>
        <div>
          <h1 className="text-2xl font-bold">
            {city}
          </h1>
          <p className="text-lg">{data.current.temp} °C</p>
          <p>{currentWeather.description}</p>
        </div>
      </div>
    </>
  );
} */

// =================================================================================================
//                                     client component version
// =================================================================================================
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
  const degrees: TempUnit = "°C"; // TODO: to be changed by the user

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) {
        // console.log("no city"); // debugging
        setWeather(undefined);
        return;
      }
      try {
        // /api/geoCode is my endpoint, created to fetch data with api key
        const uriQuery = `/api/geoCode?q=${encodeURIComponent(
          city.trim()
        )}&lat=${lat}&lon=${lon}`;
        console.log(uriQuery)
        const { data }: { data: OpenWeatherOneCallType } = await axios.get(
          uriQuery
        );
        setWeather(data);
      } catch (error) {
        setWeather(null);
        // console.error("Error on OneCallAPIComponent useEffect()!", error); // debugging
      }
    };

    fetchWeather();
  }, [city]);

  if (weather === undefined) {
    return <p className="text-blue-400 text-2xl">Enter a city name</p>;
  } else if (weather === null) {
    return (
      <p className="text-red-500 text-2xl">Error fetching weather data.</p>
    );
  }
  const currentWeather = weather?.current.weather[0];
  const iconClass = `wi ${iconDict[currentWeather.icon] || "wi-na"}`;
  const days = weather.daily;
  return (
    <>
      <div className="flex flex-col gap-4 items-center sm:flex-row sm:min-w-60 sm:justify-around">
        <i className={`${iconClass} weather-icon`}></i>
        <div>
          <h1 className="text-2xl font-bold">{city}</h1>
          <h2 className="text-xl font-bold">
            {new Date(weather.current.dt * 1000).toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "2-digit",
            })}
          </h2>
          <p className="text-lg">{weather.current.temp} °C</p>
          <p>{currentWeather.description}</p>
        </div>
      </div>

      <div className="bg-blue-100 rounded-2xl text-background flex flex-col max-w-11/12 sm:max-w-6/10 gap-4 p-4 m-4">
        <h2 className="text-xl font-bold">Forecast for the next days</h2>
        <ul className="flex gap-2 overflow-auto">
          {days.map((day, i) => (
            <li
              key={i}
              className="w-30 flex-shrink-0 odd:bg-blue-200 even:bg-blue-300 rounded-4xl p-4 flex flex-col items-center gap-2 justify-between"
            >
              <div>
                <i
                  className={`wi weather-icon-min ${
                    iconDict[day.weather[0].icon] || "wi-na"
                  }`}
                />{" "}
                {/* <p>{day.weather[0].description}</p> */}
              </div>
              <div className=" flex flex-col gap-2 items-center">
                <p>
                  {day.temp.min?.toFixed(0)} {degrees}
                </p>
                <hr className="border border-blue-700 w-3/5" />
                <p>
                  {day.temp.max?.toFixed(0)} {degrees}
                </p>
              </div>
              <p>
                {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                  weekday: "short",
                })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
