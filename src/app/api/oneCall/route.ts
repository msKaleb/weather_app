import { OpenWeatherOneCallType } from "@/lib/openWeatherOneCallAPI";
import { NextRequest, NextResponse } from "next/server";
import { getOPENWEATHER_API_KEY } from "@/lib/actions";
import { LanguageCode } from "@/lib/types";
import axios from "axios";

/**
 * @todo select desired units, language, etc. Via context to client, then via request?
 * @description
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat") || null;
  const lon = searchParams.get("lon") || null;

  const units: "standard" | "metric" | "imperial" = "metric"; // TODO: to be changed by the user
  const lang: LanguageCode = "en"; // TODO: to be changed by the user
  const oneCallAPIUrl = "https://api.openweathermap.org/data/3.0/onecall?";

  const apikey = getOPENWEATHER_API_KEY();
  console.error(req.url);

  try {
    // call OneCallAPI3.0 ==========================================================================
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

    console.log(`reaching...\n${oneCallAPIRequest}`); // debugging
    const { data: weather }: { data: OpenWeatherOneCallType } =
      await axios.get(oneCallAPIRequest);
    return NextResponse.json(weather);
  } catch (error) {
    console.error("Error on oneCallAPI", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data." },
      { status: 500 },
    );
  }
}
