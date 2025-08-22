import {
  DailyForecast,
  OpenWeatherOneCallType,
} from "@/lib/openWeatherOneCallAPI";
import { iconDict } from "@/app/dictionary";
import { dailyClass, frameClass } from "@/data/tw-styles";
import DailyWeatherIcon from "./daily-icon";
import DailyWeatherInfo from "./daily-info";
import DailyWeatherDate from "./daily-date";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const days: DailyForecast[] = weather.daily;
  const cityDate = new Date(weather.current.dt * 1000);
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <div className={`${frameClass} m-4 flex flex-col gap-4 p-4`}>
      <h2 className="pl-4 text-center text-xl font-bold">
        Forecast for the next week
      </h2>
      <ul className="flex gap-4 overflow-auto sm:mx-auto sm:grid sm:grid-cols-3 sm:items-center lg:grid-cols-4">
        {days.map((day, index) => (
          <li
            onClick={() => setSelectedDay(index)}
            key={index}
            className={cn(dailyClass, selectedDay === index && "selected-day")}
          >
            <DailyWeatherIcon
              icon={iconDict[day.weather[0].icon]}
              condition={day.weather[0].main}
            />
            <DailyWeatherInfo day={day} />
            <DailyWeatherDate
              dailyDate={new Date(day.dt * 1000)}
              currentDate={cityDate}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
