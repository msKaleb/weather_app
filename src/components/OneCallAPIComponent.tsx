"use client";
import { OpenWeatherOneCallType } from "@/lib/openWeatherOneCallAPI";
import { useEffect, useState } from "react";
import { iconDict } from "@/app/dictionary";
import axios from "axios";
import { TempUnit } from "@/lib/types";
import Image from "next/image";
import rain from "@/assets/wi-raindrop.svg";
import wind from "@/assets/wi-strong-wind.svg";

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
/**
 * @todo when typing a city and pressing enter, the displayed city is what it was sent,
 * should be the matching city from the API (eg. aaa should return 'Anaa, FR').
 * Maybe /geoCode.ts should just return the matching cities, and put the weather retrieve
 * into another different endpoint. Deactivating 'Enter' key press in CityCombobox for now
 * @todo check wind speed units
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
          city.trim(),
        )}&lat=${lat}&lon=${lon}`;
        const { data }: { data: OpenWeatherOneCallType } =
          await axios.get(uriQuery);
        setWeather(data);
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
  return (
    <>
      <div className="flex flex-col items-center gap-4 sm:min-w-60 sm:flex-row sm:justify-around">
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

      {/* forecast for the next days */}
      <div className="border-foreground m-4 flex w-[90%] flex-col gap-4 rounded-2xl border bg-[#fafafa] px-1 py-4 text-[#09090b] sm:max-w-2/5">
        <h2 className="pl-4 text-xl font-bold">Forecast for the next days</h2>
        <ul className="flex gap-4 overflow-auto sm:mx-auto sm:grid sm:grid-cols-4 sm:items-center">
          {days.map((day) => {
            const date = new Date(day.dt * 1000);
            return (
              <li
                key={day.dt}
                className="flex w-20 flex-shrink-0 flex-col items-center justify-between gap-4 rounded-2xl p-4 odd:bg-blue-200 even:bg-blue-300 sm:w-40"
              >
                {/* weather icon */}
                <div className="p-2">
                  <i
                    className={`wi weather-icon-min ${
                      iconDict[day.weather[0].icon] || "wi-na"
                    }`}
                  />{" "}
                  {/* <p>{day.weather[0].description}</p> */}
                </div>
                {/* wind speed, rain likelihood and temperature */}
                <div className="flex w-full flex-col items-center gap-1">
                  <p className="text-center">
                    {day.temp.min?.toFixed(0)}°{" "}
                    <span className="hidden sm:inline">/</span>{" "}
                    {day.temp.max?.toFixed(0)}°
                  </p>
                  <div className="hidden w-full gap-1 sm:flex">
                    <div className="w-1/4">
                      <Image className="" alt="wind" src={wind} width={40} />
                    </div>
                    <div className="w-3/4 text-end">
                      {(day.wind_speed * 3.6).toFixed(1) || 0} km/h
                    </div>
                  </div>
                  <div className="hidden w-full gap-1 sm:flex">
                    <div className="w-1/4">
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

      <div className="border-foreground m-4 flex w-[90%] gap-4 rounded-2xl border bg-[#fafafa] p-4 text-[#09090b] sm:max-w-2/5">
        <div className="w-2/4 rounded-2xl bg-blue-300 p-2">
          <p>Precipitation</p>
          <span className="text-5xl font-bold">
            {weather.minutely && weather.minutely[0].precipitation > 0
              ? weather.minutely[0].precipitation.toFixed(1)
              : 0}
          </span>
          mm/h
        </div>
        <div className="w-2/4 rounded-2xl bg-blue-300 p-2">
          <p>Wind speed</p>
          <span className="text-5xl font-bold">
            {(weather.current.wind_speed * 3.6).toFixed(1)}
          </span>
          km/h
        </div>
      </div>
    </>
  );
}

/* 
                  <div className="flex items-center justify-center gap-2 text-[0.9rem]">
                    <Image alt="wind" src={wind} width={40} />
                    {day.wind_speed} m/s
                  </div>
                  <div className="flex items-center justify-center gap-2 text-[0.9rem]">
                    <Image alt="rain" src={rain} width={50} />
                    {day.rain} mm/h
                  </div>
*/
