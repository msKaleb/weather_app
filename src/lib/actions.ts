import { VCWeatherResponse, weatherType } from "./utils";
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
    // console.log(data); // debugging
    return data;
  } catch {
    return null;
  }
}

export async function fetchVCWeatherData(
  city: string | undefined
): Promise<VCWeatherResponse | null> {
  const apikey = process.env.VISUALCROSSING_API_KEY;
  const unitGroup = "metric";
  const baseUrl =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

  try {
    console.log(
      `${baseUrl}${city}?key=${apikey}&unitGroup=${unitGroup}&contentType=json`
    );
    const { data }: { data: VCWeatherResponse } = await axios.get(
      `${baseUrl}${city}?key=${apikey}&unitGroup=${unitGroup}&contentType=json`
    );
    // console.log("fetchVCWeatherData: ", data.currentConditions); // debugging
    return data;
  } catch {
    console.error("Error!");
    return null;
  }
}
