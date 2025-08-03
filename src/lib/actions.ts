import { weatherType } from "./utils";
import axios from "axios";

export async function fetchWeatherData(
  city: string | undefined
): Promise<weatherType | null> {
  const apikey = process.env.OPENWEATHER_API_KEY;
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

  try {
    const { data }: { data: weatherType } = await axios.get(
      `${baseUrl}${city}&appid=${apikey}&units=metric`
    );
    return data;
  } catch (error) {
    return null;
  }
}
