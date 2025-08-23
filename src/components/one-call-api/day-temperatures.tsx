import { frameClass } from "@/data/tw-styles";
import { DailyForecast } from "@/lib/openWeatherOneCallAPI";
import morning from "@/assets/wi-sunrise.svg";
import midday from "@/assets/wi-day-sunny.svg";
import evening from "@/assets/wi-sunset.svg";
import night from "@/assets/wi-night-clear.svg";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function DayTemperatures({ day }: { day: DailyForecast }) {
  const { resolvedTheme } = useTheme();

  return (
    <div className={`${frameClass} m-4 flex flex-col items-center gap-4 p-4`}>
      <div>
        <p className="text-center text-xl font-bold">
          {new Date(day.dt * 1000).toLocaleString(undefined, {
            dateStyle: "long",
          })}
        </p>
        <p className="text-center">{day.summary}</p>
      </div>

      {/* <p className="text-center font-bold">Temperature throughout the day</p> */}
      <div className="flex w-full justify-around">
        <div id="morning">
          <Image
            className={`${resolvedTheme === "dark" && "svg-dark"}`}
            alt="morning"
            src={morning}
          />
          <span>{Math.round(day.temp.morn || 0)}º</span>
        </div>
        <div id="midday">
          <Image
            className={`${resolvedTheme === "dark" && "svg-dark"}`}
            alt="midday"
            src={midday}
          />
          <span>{Math.round(day.temp.day || 0)}º</span>
        </div>
        <div id="evening">
          <Image
            className={`${resolvedTheme === "dark" && "svg-dark"}`}
            alt="evening"
            src={evening}
          />
          <span>{Math.round(day.temp.eve || 0)}º</span>
        </div>
        <div id="night">
          <Image
            className={`${resolvedTheme === "dark" && "svg-dark"}`}
            alt="night"
            src={night}
          />
          <span>{Math.round(day.temp.night || 0)}º</span>
        </div>
      </div>
    </div>
  );
}
