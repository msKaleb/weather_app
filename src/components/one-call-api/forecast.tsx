import { OpenWeatherOneCallType } from "@/lib/openWeatherOneCallAPI";
import Image from "next/image";
import { iconDict } from "@/app/dictionary";
import { useTheme } from "next-themes";
import wind from "@/assets/wi-strong-wind.svg";
import umbrella from "@/assets/wi-umbrella.svg";
import snow from "@/assets/wi-snowflake-cold.svg";
import rain from "@/assets/wi-raindrop.svg";
import thermometer from "@/assets/wi-thermometer.svg";
import { frameClass } from "@/data/constants";

/**
 * @todo windSpeedConversion should depend on units, now hardcoded to 'metric'
 * @todo maybe divide into smaller components??
 * @todo change onClick event on <li>, now is for testing
 */
export default function OneCallForecast({
  weather,
}: {
  weather: OpenWeatherOneCallType;
}) {
  const { resolvedTheme } = useTheme();
  const days = weather.daily;
  const cityDate = new Date(weather.current.dt * 1000);
  const windSpeedConversion = 3.6;

  return (
    <div className={`${frameClass} m-4 flex flex-col gap-4 p-4`}>
      <h2 className="pl-4 text-center text-xl font-bold">
        Forecast for the next week
      </h2>
      <ul className="flex gap-4 overflow-auto sm:mx-auto sm:grid sm:grid-cols-3 sm:items-center lg:grid-cols-4">
        {days.map((day) => {
          const dailyDate = new Date(day.dt * 1000);
          const tempMin = Math.round(day.temp.min || NaN);
          const tempMax = Math.round(day.temp.max || NaN);

          return (
            <li
              onClick={() => {
                alert(
                  `Forecast for ${dailyDate.toLocaleDateString()}: ${day.weather[0].description}`,
                );
              }}
              key={day.dt}
              className="border-foreground flex w-20 flex-shrink-0 flex-col items-center justify-between gap-4 rounded-2xl border p-4 hover:cursor-pointer sm:min-h-75 sm:w-40"
            >
              {/* weather icon */}
              <div className="h-1/3 p-2">
                <i
                  className={`wi weather-icon-min ${
                    iconDict[day.weather[0].icon] || "wi-na"
                  }`}
                />{" "}
                <p className="mt-2 text-center text-[0.9rem]">
                  {day.weather[0].main}
                </p>
              </div>

              {/* temperature, wind speed and precipitation volume */}
              <div className="gap-1; flex h-1/3 w-full flex-col items-center justify-center">
                <div className="w-full gap-3 sm:flex">
                  <div
                    className={`${resolvedTheme === "dark" && "svg-dark"} hidden w-1/4 sm:inline`}
                  >
                    <Image alt="temp" src={thermometer} width={40} />
                  </div>
                  <div className="hidden w-3/4 justify-start whitespace-pre sm:flex">
                    {tempMin}° / {tempMax}°
                  </div>
                  <div className="inline whitespace-pre sm:hidden">
                    <p className="text-center">↓ {tempMin}°</p>
                    <p className="text-center">↑ {tempMax}°</p>
                  </div>
                </div>

                <div className="hidden w-full gap-3 sm:flex">
                  <div
                    className={`${resolvedTheme === "dark" && "svg-dark"} w-1/4`}
                  >
                    <Image alt="wind" src={wind} width={40} />
                  </div>
                  <div className="text-end; w-3/4">
                    {(day.wind_speed * windSpeedConversion).toFixed(1) || 0}{" "}
                    km/h
                  </div>
                </div>

                <div className="hidden w-full gap-3 sm:flex">
                  <div
                    className={`${resolvedTheme === "dark" && "svg-dark"} w-1/4`}
                  >
                    <Image alt="umbrella" src={umbrella} width={50} />
                  </div>
                  <div className="text-end; w-3/4">
                    {day.rain || day.snow || 0} mm/h
                  </div>
                </div>
              </div>

              {/* date */}
              {dailyDate.getDate() === cityDate.getDate() ? (
                <div className="flex h-1/3 flex-col justify-start">
                  <p>Today</p>
                  <p className="text-center text-[0.9rem]">
                    {dailyDate.toLocaleDateString(undefined, {
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>
              ) : (
                <div className="flex h-1/3 flex-col justify-start">
                  <p className="text-center">
                    {dailyDate.toLocaleDateString(undefined, {
                      weekday: "short",
                    })}
                  </p>
                  <p className="text-center text-[0.9rem]">
                    {dailyDate.toLocaleDateString(undefined, {
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
