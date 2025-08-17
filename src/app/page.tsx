import OneCallAPIComponent from "@/components/OneCallAPIComponent";
import { ToggleTheme } from "@/components/ToggleTheme";
import CityCombobox from "@/components/CityCombobox";
import { getGeoCodeCities } from "@/lib/actions";
import { geoCodingType } from "@/lib/types";
import Link from "next/link";

/**
 * @todo geoCode returns an array, which one should we pick? for now picking [0]
 * @todo maybe migrate icons to Lucide-React???
 */
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

  return (
    <main className="bg-background m-1 flex min-h-screen flex-col items-center justify-start gap-8 py-8">
      <Link replace href={`/`} className="text-4xl font-bold">
        Weather App
      </Link>
      <ToggleTheme />
      <CityCombobox />
      <OneCallAPIComponent city={city} lat={lat} lon={lon} />
    </main>
  );
}
