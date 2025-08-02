import "weather-icons/css/weather-icons.css";
import { iconDict } from "@/app/dictionary";
import { weatherType } from "@/lib/utils";
import { fetchWeatherData } from "@/lib/actions";

// =================================================================================================
//                                         WeatherComponent
// =================================================================================================
export default async function WeatherComponent({
  city = "Bilbao",
}: {
  city?: string;
}) {
  const data: weatherType | null = await fetchWeatherData(city);
  if (!data) {
    return <p className="text-red-500">Error fetching weather data.</p>;
  }
  const icon = data.weather[0].icon;
  const iconClass = `wi ${iconDict[icon] || "wi-na"}`;
  return (
    <>
      <div className="flex flex-col gap-4 items-center sm:flex-row sm:min-w-60 sm:justify-around">
        <i className={`${iconClass} weather-icon`}></i>
        <div>
          <h1 className="text-2xl font-bold">
            {data.name}, {data.sys.country}
          </h1>
          <p className="text-lg">{data.main.temp} °C</p>
          <p>{data.weather[0].description}</p>
        </div>
      </div>
    </>
  );
}
