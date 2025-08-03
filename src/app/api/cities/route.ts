import { NextRequest, NextResponse } from "next/server";
import { cityType } from "@/lib/utils";
import citiesJson from "@/data/cities.json" assert { type: "json" };

export async function GET(req: NextRequest) {
  const cities: cityType[] = citiesJson as cityType[];
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query || query?.length < 3) {
    return NextResponse.json([]);
  }

  const results = cities
    .filter((city) => city.name.toLowerCase().startsWith(query.toLowerCase()))
    .sort((a: cityType, b: cityType) => a.name.localeCompare(b.name)) // sort ascending
    .slice(0, 10); // only return top 20
  return NextResponse.json(results);
}
