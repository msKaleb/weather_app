import { OpenWeatherOneCallType } from "@/lib/openWeatherOneCallAPI";
import Image from "next/image";
import { iconDict } from "@/app/dictionary";
import { useTheme } from "next-themes";
import wind from "@/assets/wi-strong-wind.svg";
import rain from "@/assets/wi-raindrop.svg";

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
    <div className="border-foreground m-4 flex w-[90%] flex-col gap-4 rounded-2xl border px-4 py-4 sm:max-w-[600px] lg:max-w-[800px] lg:min-w-[400px]">
      <h2 className="pl-4 text-xl font-bold">Forecast for the next week</h2>
      <ul className="flex gap-4 overflow-auto sm:mx-auto sm:grid sm:grid-cols-3 sm:items-center lg:grid-cols-4">
        {days.map((day) => {
          const dailyDate = new Date(day.dt * 1000);
          const tempMin = Math.round(day.temp.min || NaN);
          const tempMax = Math.round(day.temp.max || NaN);

          // TODO: maybe show it, but change day for 'Today'??
          if (dailyDate.getDate() === cityDate.getDate()) {
            return;
          }

          return (
            <li
              onClick={() => {
                alert(`Forecast for ${dailyDate.toLocaleDateString()}: ${day.weather[0].description}`);
              }}
              key={day.dt}
              className="border-foreground flex w-20 flex-shrink-0 flex-col items-center justify-between gap-4 rounded-2xl border p-4 hover:cursor-pointer sm:w-40"
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
            </li>
          );
        })}
      </ul>
    </div>
  );
}
