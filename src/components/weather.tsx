import axios from "axios";
import "weather-icons/css/weather-icons.css";
import { iconDict } from "@/app/dictionary";
import { weatherType } from "@/lib/utils";

const apikey = process.env.OPENWEATHER_API_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const london = `q=London`;
const rome = `lat=${41.902782}&lon=${12.496366}`;
const bilbao = `lat=${43.262985}&lon=${-2.935013}`;
const andorra = `q=Andorra la Vella`;

export default async function WeatherComponent({ city }: { city: string }) {
  try {
    const { data }: { data: weatherType } = await axios.get(
      `${baseUrl}${city}&appid=${apikey}&units=metric`
    );
    const icon = data.weather[0].icon;
    const iconClass = `wi ${iconDict[icon] || "wi-na"}`;
    return (
      <>
        <h1 className="text-4xl font-bold">Weather App</h1>

        <div className="flex flex-col sm:flex-row ">
          <i className={`${iconClass} weather-icon`}></i>
          <div>
            <h1 className="text-2xl font-bold">{data.name}, {data.sys.country}</h1>
            <p className="text-lg">{data.main.temp} °C</p>
            <p>{data.weather[0].description}</p>
          </div>
        </div>
      </>
    );
  } catch (error) {
    return <p>City not found</p>;
  }
}
