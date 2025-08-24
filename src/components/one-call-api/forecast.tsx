import {
  DailyForecast,
  OpenWeatherOneCallType,
} from "@/lib/openWeatherOneCallAPI";
import { iconDict } from "@/app/dictionary";
import { dailyClass, frameClass } from "@/data/tw-styles";
import DailyWeatherIcon from "./daily-icon";
import DailyWeatherInfo from "./daily-info";
import DailyWeatherDate from "./daily-date";
import { cn } from "@/lib/utils";

/**
 * @description shows an 8-day forecast
 */
export default function OneCallForecast({
  weather,
  selectedDay,
  onChange,
}: {
  weather: OpenWeatherOneCallType;
  selectedDay: number;
  onChange: (day: number) => void;
}) {
  const days: DailyForecast[] = weather.daily;
  const cityDate = new Date(weather.current.dt * 1000);

  return (
    <div className={`${frameClass} m-4 flex flex-col gap-4 p-4`}>
      <h2 className="pl-4 text-center text-xl font-bold">
        8-day weather forecast
      </h2>
      <ul className="flex gap-4 overflow-x-scroll sm:mx-auto sm:grid sm:grid-cols-3 sm:items-center lg:grid-cols-4">
        {days.map((day, index) => (
          <li
            onClick={() => onChange(index)}
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
