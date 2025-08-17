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
  weather: OpenWeatherOneCallType;
  city: string | undefined;
}) {
  const currentWeather = weather?.current.weather[0];
  const cityDate = new Date(weather.current.dt * 1000);
  const degrees: TempUnit = "°C";
  const iconClass = `wi ${iconDict[currentWeather.icon] || "wi-na"}`;
  const description: string = currentWeather.description
    .split(" ")
    .map((word) => word[0].toLocaleUpperCase() + word.slice(1))
    .join(" ");

  return (
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
        <h2 className="text-2xl font-bold">{description}</h2>
      </div>
    </div>
  );
}
