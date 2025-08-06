import { weatherType } from "./utils";
import { OpenWeatherOneCallType } from "./openWeatherOneCallAPI";
import { VCWeatherType } from "./visualCrossingType";
import { geoCodingType } from "./utils";
import axios from "axios";

export function getOPENWEATHER_API_KEY() {
  return process.env.OPENWEATHER_API_KEY;
}

/**
 * @todo select desired units, language, etc. Maybe via context?
 * @todo geoCode returns an array, which one should we pick? for now picking [0]
 */
/* export async function fetchOpenWeatherOneCallAPI(
  city: string | undefined
): Promise<OpenWeatherOneCallType | null> {
  const units = "metric"; // to be changed by the user ('standard' | 'metric' | 'imperial')

  const apikey = getOPENWEATHER_API_KEY();
  const geoCodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
  const oneCallAPIUrl = "https://api.openweathermap.org/data/3.0/onecall?";

  try {
    // call geoCode API ============================================================================
    const { data }: { data: geoCodingType[] } = await axios.get(
      `${geoCodeUrl}${city}&limit=10&appid=${apikey}`
    );
    const coords = `lat=${data[0].lat}&lon=${data[0].lon}`;

    // call OneCallAPI3.0 ==========================================================================
    const oneCallAPIRequest = `${oneCallAPIUrl}${coords}&units=${units}&appid=${apikey}`;
    // console.log(`reaching...\n${oneCallAPIRequest}`); // debugging
    const { data: weather }: { data: OpenWeatherOneCallType } = await axios.get(
      oneCallAPIRequest
    );
    return weather;
  } catch {
    return null;
  }
} */

export async function fetchWeatherData(
  city: string | undefined
): Promise<weatherType | null> {
  const apikey = getOPENWEATHER_API_KEY();
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
): Promise<VCWeatherType | null> {
  const apikey = process.env.VISUALCROSSING_API_KEY;
  const unitGroup = "metric";
  const baseUrl =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

  try {
    const { data }: { data: VCWeatherType } = await axios.get(
      `${baseUrl}${city}?key=${apikey}&unitGroup=${unitGroup}&contentType=json`
    );
    // console.log("fetchVCWeatherData: ", data.currentConditions); // debugging
    return data;
  } catch {
    console.error("Error!");
    return null;
  }
}
