import { useTheme } from "next-themes";
import wind from "@/assets/wi-strong-wind.svg";
import umbrella from "@/assets/wi-umbrella.svg";
import thermometer from "@/assets/wi-thermometer.svg";
import Image from "next/image";
import { DailyForecast } from "@/lib/openWeatherOneCallAPI";

export default function DailyWeatherInfo({ day }: { day: DailyForecast }) {
  const { resolvedTheme } = useTheme();
  const tempMin = Math.round(day.temp.min || NaN);
  const tempMax = Math.round(day.temp.max || NaN);
  const windSpeedConversion = 3.6;

  function formatPrecipitation(value?: number): number {
    if (!value) return 0;
    if (value >= 1000) return value;
    return parseFloat(value.toPrecision(3));
  }

  return (
    <div className="flex h-1/3 w-full flex-col items-center justify-center">
      {/* temperature ranges */}
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

      {/* wind speed */}
      <div className="hidden w-full gap-3 sm:flex">
        <div className={`${resolvedTheme === "dark" && "svg-dark"} w-1/4`}>
          <Image alt="wind" src={wind} width={40} />
        </div>
        <div className="w-3/4">
          {(day.wind_speed * windSpeedConversion).toFixed(1) || 0} km/h
        </div>
      </div>

      {/* precipitation volume */}
      <div className="hidden w-full gap-3 sm:flex">
        <div className={`${resolvedTheme === "dark" && "svg-dark"} w-1/4`}>
          <Image alt="umbrella" src={umbrella} width={50} />
        </div>
        <p className="w-3/4">
          {formatPrecipitation(day.snow) || formatPrecipitation(day.rain) || 0}{" "}
          mm/h
        </p>
      </div>
    </div>
  );
}
