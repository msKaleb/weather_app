import { NextResponse } from "next/server";
import { cityType } from "@/lib/utils";
import citiesJson from "@/data/cities.json" assert { type: "json" };

export async function GET(req: Request) {
  const cities: cityType[] = citiesJson as cityType[];
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  /*   return NextResponse.json({
    message: query,
  }); */
  if (!query || query?.length < 3) {
    return NextResponse.json([]);
  }
  const results = cities
    .filter((city) => city.name.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, 20); // only return top 20
  return NextResponse.json(results);
}
