import { NextRequest, NextResponse } from "next/server";
import { geoCodingType } from "@/lib/types";
import { getOPENWEATHER_API_KEY } from "@/lib/actions";

/**
 * @description this endpoint returns the matching cities using geoCode API
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat") || null;
  const lon = searchParams.get("lon") || null;
  const apikey = getOPENWEATHER_API_KEY();
  const geoCodeUrl = "http://api.openweathermap.org/geo/1.0/reverse?";

  //   console.log(`Coords: {${lat}, ${lon}}`) // debugging
  try {
    const response = await fetch(
      `${geoCodeUrl}lat=${lat}&lon=${lon}&limit=1&appid=${apikey}`,
      {
        cache: "force-cache",
        next: { revalidate: 600, tags: ["geoCodeReverseAPI"] },
      },
    );
    const data: geoCodingType[] = await response.json();

    console.log("Returning city from geoCodeReverse...", data[0].name); // debugging
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error("Geocoding API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch location data" },
      { status: 500 },
    );
  }
}
