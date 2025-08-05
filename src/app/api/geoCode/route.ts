import { NextRequest, NextResponse } from "next/server";
// import { geoCodingType } from "@/lib/utils"; // can I use it?
import { getOPENWEATHER_API_KEY } from "@/lib/actions";
import axios from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  if (!query || query?.length < 3) {
    return NextResponse.json([]);
  }

  const apikey = getOPENWEATHER_API_KEY();
  const baseUrl = "http://api.openweathermap.org/geo/1.0/direct?q=";

  try {
    const data = await axios.get(
      `${baseUrl}${query}&limit=10&appid=${apikey}`
    );
    const res = await fetch(`${baseUrl}${query}&limit=10&appid=${apikey}`);

    return new NextResponse(data.data);
  } catch {
    return null;
  }
}
