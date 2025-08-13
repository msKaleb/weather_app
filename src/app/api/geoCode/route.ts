import { NextRequest, NextResponse } from "next/server";
import { geoCodingType } from "@/lib/types";
import { getOPENWEATHER_API_KEY } from "@/lib/actions";
import axios from "axios";

/**
 * @description this endpoint returns the matching cities using geoCode API
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  const apikey = getOPENWEATHER_API_KEY();
  const geoCodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";

  try {
    const { data }: { data: geoCodingType[] } = await axios.get(
      `${geoCodeUrl}${query}&limit=10&appid=${apikey}`,
    );
    console.log("Returning city list...");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Geocoding API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 },
    );
  }
}
