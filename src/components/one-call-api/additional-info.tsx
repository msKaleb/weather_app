import { OpenWeatherOneCallType } from "@/lib/openWeatherOneCallAPI";
import Image from "next/image";
import { useTheme } from "next-themes";
// import windDeg from "@/assets/wi-wind-deg.svg";
import windDeg from "@/assets/wind-direction.svg";
import { frameClass } from "@/data/tw-styles";

/**
 * @todo windSpeedConversion should depend on units, now hardcoded to 'metric'
 */
export default function OneCallAdditionalInfo({
  weather,
}: {
  weather: OpenWeatherOneCallType;
}) {
  const { resolvedTheme } = useTheme();
  const windSpeedConversion = 3.6;

  return (
    <div className={`${frameClass} m-4 grid grid-cols-2 gap-4 p-4 sm:flex sm:justify-around`}>
      <div className="flex flex-col items-center gap-1 rounded-2xl p-2 sm:order-1">
        <p>Precipitation</p>
        <div>
          <span className="mr-1 text-4xl font-bold">
            {weather.minutely && weather.minutely[0].precipitation > 0
              ? weather.minutely[0].precipitation.toFixed(1)
              : 0}
          </span>
          mm/h
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 rounded-2xl p-2 sm:order-3">
        <p>Wind speed</p>
        <div>
          <span className="mr-1 text-4xl font-bold">
            {(weather.current.wind_speed * windSpeedConversion).toFixed(1)}
          </span>
          km/h
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 rounded-2xl p-2 sm:order-2">
        <p>Humidity</p>
        <div>
          <span className="mr-1 text-4xl font-bold">
            {weather.current.humidity}
          </span>
          %
        </div>
      </div>
      <div className="flex flex-col items-center rounded-2xl p-2 sm:order-4">
        <p>Wind direction</p>
        <div className="border-foreground border-2; m-auto w-[70px] rounded-full">
          <Image
            alt="wind-deg"
            src={windDeg}
            className={`${resolvedTheme === "dark" && "svg-dark"} p-2`}
            style={{
              transform: `rotate(${weather.current.wind_deg - 180}deg)`,
            }}
            width={60}
          />
        </div>
      </div>
    </div>
  );
}
