import Link from "next/link";
import OneCallAPIComponent from "@/components/OneCallAPIComponent";
import CityCombobox from "@/components/CityCombobox";
import { ToggleTheme } from "@/components/ToggleTheme";
import { getGeoCodeCities } from "@/lib/actions";
import { geoCodingType } from "@/lib/types";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; lat?: number; lon?: number }>;
}) {
  const params = await searchParams;
  let city = params?.city || undefined;
  let lat = params?.lat || null;
  let lon = params?.lon || null;

  if ((!lat || !lon) && city) {
    const cities: geoCodingType[] | null = await getGeoCodeCities(city);

    if (cities && cities.length > 0) {
      city = `${cities[0].name}, ${cities[0].country}`;
      lat = cities[0].lat;
      lon = cities[0].lon;
    }
  }

  console.log(`In page.tsx:\n\tcity:\t${city}\n\tlat:\t${lat}\n\tlon:\t${lon}`);
  return (
    // <div className="flex sm:grid sm:grid-rows-[1fr_2fr_1fr]">
    <main className="bg-background m-1 flex min-h-screen flex-col items-center justify-start gap-8 py-8">
      <Link replace href={`/`} className="text-4xl font-bold">
        Weather App
      </Link>
      <ToggleTheme />
      {/* <CityDatalist /> */}
      <CityCombobox />
      {/* <WeatherComponent city={city} /> */}
      <OneCallAPIComponent city={city} lat={lat} lon={lon} />
      {/* <VCWeatherComponent city={city} /> */}
    </main>
    // </div>
  );
}
