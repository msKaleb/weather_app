import { OpenWeatherOneCallType } from "@/lib/openWeatherOneCallAPI";
import { iconDict } from "@/app/dictionary";
import { TempUnit } from "@/lib/types";
import Clock from "@/components/clock";

/**
 * @todo degrees should be selected by the user, now hardcoded to "°C"
 */
export default function OneCallCurrentWeather({
  weather,
  city,
}: {
  weather: OpenWeatherOneCallType | undefined | null;
  city: string | undefined | null;
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

  const regionNames = new Intl.DisplayNames(navigator.language, {
    type: "region",
  });
  const countryCode = city?.split(",")[1]?.trim() || "";
  const countryName = countryCode && regionNames.of(countryCode);
  const displayedCity = `${city?.split(",")[0].trim()}${countryName && ", "}${countryName}`;

  return (
    <div className="flex flex-col items-center gap-4 px-4 sm:min-w-60 sm:flex-row sm:justify-around sm:gap-8">
      <i className={`${iconClass} weather-icon`}></i>
      <div>
        <h1 className="text-3xl font-bold">{displayedCity}</h1>
        <h2 className="text-2xl font-bold">
          {cityDate.toLocaleDateString(navigator.language, {
            weekday: "long",
            month: "long",
            day: "2-digit",
          })}
        </h2>
        <h2 className="text-2xl font-bold">{description}</h2>
        <div>
          <span className="text-xl font-bold">Local time: </span>
          <Clock
            timeZone={weather.timezone}
            locale={navigator.language || city?.split(", ")[1]}
          />
        </div>
        <p className="text-4xl">
          {weather.current.temp.toFixed(1)}
          {degrees}
        </p>
      </div>
    </div>
  );
}
