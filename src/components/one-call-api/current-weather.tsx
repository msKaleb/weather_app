import { OpenWeatherOneCallType } from "@/lib/openWeatherOneCallAPI";
import { iconDict } from "@/app/dictionary";
import { TempUnit } from "@/lib/types";
import { RefreshCw } from "lucide-react";
import Clock from "@/components/clock";

/**
 * @todo degrees should be selected by the user, now hardcoded to "°C"
 */
export default function OneCallCurrentWeather({
  weather,
  city,
  refreshCache,
}: {
  weather: OpenWeatherOneCallType | undefined | null;
  city: string | undefined | null;
  refreshCache: () => void;
}) {
  if (!weather) {
    return;
  }

  const currentWeather = weather?.current.weather[0];
  const cityDate = new Date(weather.current.dt * 1000);
  const degrees: TempUnit = "°C";
  const iconClass = `wi ${iconDict[currentWeather.icon] || "wi-na"}`;
  const description: string = currentWeather.description
    .split(" ")
    .map((word) => word[0].toLocaleUpperCase() + word.slice(1))
    .join(" ");

  const regionNames = new Intl.DisplayNames("en-GB", {
    type: "region",
  });
  const countryCode = city?.split(",")[1]?.trim() || "";
  const countryName = countryCode && regionNames.of(countryCode);
  const displayedCity = `${city?.split(",")[0].trim()}`;

  // use 'city?.split(", ")[1]' as locale for city's own locale ====================================
  return (
    <div className="flex flex-col items-center gap-8 px-4 text-center sm:min-w-60 sm:flex-row sm:justify-around sm:gap-20 sm:text-start">
      <i className={`${iconClass} weather-icon`}></i>
      <div>
        <h1 className="text-3xl font-bold">
          {displayedCity}
          {countryName && <span className="font-normal"> ({countryName})</span>}
        </h1>
        <br />

        <h2 className="text-2xl font-bold">
          {cityDate.toLocaleDateString("en-GB", {
            weekday: "long",
            month: "long",
            day: "2-digit",
          })}
        </h2>
        <div>
          <div className="text-l">
            <span className="font-bold">{displayedCity} local time: </span>
            <Clock timeZone={weather.timezone} locale="en-GB" />
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <p>
              <span className="text-xl font-bold">Last checked: </span>
              {cityDate.toTimeString().split(" ")[0]}
            </p>
            <RefreshCw
              className="hover:cursor-pointer"
              onClick={refreshCache}
            />
          </div>
        </div>
        <br />

        <h2 className="text-2xl font-bold">{description}</h2>
        <p className="text-4xl">
          {weather.current.temp.toFixed(1)}
          {degrees}
        </p>
      </div>
    </div>
  );
}
