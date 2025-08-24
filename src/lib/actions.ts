import { geoCodingType, weatherType } from "./types";
import { VCWeatherType } from "./visualCrossingType";
import axios from "axios";

export function getOPENWEATHER_API_KEY() {
  return process.env.OPENWEATHER_API_KEY;
}

/**
 * @description deprecated, used in WeatherComponent
 */
export async function fetchWeatherData(
  city: string | undefined,
): Promise<weatherType | null> {
  const apikey = getOPENWEATHER_API_KEY();
  const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

  try {
    const { data }: { data: weatherType } = await axios.get(
      `${baseUrl}${city}&appid=${apikey}&units=metric`,
    );
    // console.log(data); // debugging
    return data;
  } catch {
    return null;
  }
}

/**
 * @todo change axios for standard fetch() (cache), not being used now
 */
export async function fetchVCWeatherData(
  city: string | undefined,
): Promise<VCWeatherType | null> {
  const apikey = process.env.VISUALCROSSING_API_KEY;
  const unitGroup = "metric";
  const baseUrl =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

  try {
    const { data }: { data: VCWeatherType } = await axios.get(
      `${baseUrl}${city}?key=${apikey}&unitGroup=${unitGroup}&contentType=json`,
    );
    // console.log("fetchVCWeatherData: ", data.currentConditions); // debugging
    return data;
  } catch (error) {
    console.error("Error!", error);
    return null;
  }
}

/**
 * @param city
 * @returns an array of matching cities
 */
export async function getGeoCodeCities(city: string): Promise<geoCodingType[]> {
  const apikey = getOPENWEATHER_API_KEY();
  const geoCodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";

  try {
    const response = await fetch(
      `${geoCodeUrl}${city}&limit=10&appid=${apikey}`,
      {
        cache: "force-cache",
        next: { revalidate: 600 },
      },
    ); // tags?
    const data: geoCodingType[] = await response.json();

    // console.log(`reaching...\n${geoCodeUrl}${city}&limit=10&appid=${apikey}`); // debugging
    return data;
  } catch (error) {
    console.error("Error fetching matching cities:", error);
    return [];
  }
}
