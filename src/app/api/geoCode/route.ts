import { NextRequest, NextResponse } from "next/server";
import { geoCodingType, LanguageCode } from "@/lib/utils";
import { OpenWeatherOneCallType } from "@/lib/openWeatherOneCallAPI";
import { getOPENWEATHER_API_KEY } from "@/lib/actions";
import axios from "axios";

/**
 * @todo select desired units, language, etc. Via context to client, then via request?
 * @todo geoCode returns an array, which one should we pick? for now picking [0]
 * @description this endpoint returns the weather conditions using geoCode API
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  let lat = searchParams.get("lat") || null;
  let lon = searchParams.get("lon") || null;
  const returnWeather = searchParams.get("w");
  const units: "standard" | "metric" | "imperial" = "metric"; // TODO: to be changed by the user
  const lang: LanguageCode = "en"; // TODO: to be changed by the user

  const apikey = getOPENWEATHER_API_KEY();
  const geoCodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";
  const oneCallAPIUrl = "https://api.openweathermap.org/data/3.0/onecall?";

  try {
    // call geoCode API ============================================================================
    if (!Number(lat) || !Number(lon)) {
      const { data }: { data: geoCodingType[] } = await axios.get(
        `${geoCodeUrl}${query}&limit=10&appid=${apikey}`
      );
      lat = data[0].lat.toString();
      lon = data[0].lon.toString();
      if (returnWeather === "false") {
        // console.log(`reaching...\n${geoCodeUrl}${query}&limit=10&appid=${apikey}`); // debugging
        console.log("Returning city list...");
        return NextResponse.json(data);
      }
    }
    
    // call OneCallAPI3.0 ==========================================================================
    // const oneCallAPIRequest = `${oneCallAPIUrl}${coords}&units=${units}&appid=${apikey}`;
    const oneCallAPIRequest =
      oneCallAPIUrl +
      "lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=" +
      units +
      "&appid=" +
      apikey +
      "&lang=" +
      lang;

    // console.log(`reaching...\n${oneCallAPIRequest}`); // debugging
    const { data: weather }: { data: OpenWeatherOneCallType } = await axios.get(
      oneCallAPIRequest
    );
    return NextResponse.json(weather);
  } catch (error) {
    console.error("Geocoding API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 }
    );
  }
}
