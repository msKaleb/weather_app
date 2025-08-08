// import VCWeatherComponent from "@/components/VCWeatherComponent";
// import WeatherComponent from "@/components/WeatherComponent";
// import CityDatalist from "@/components/CityDatalist";
import Link from "next/link";
import OneCallAPIComponent from "@/components/OneCallAPIComponent";
// import GPTCityCombobox from "@/deprecated/GPTCityComboBox";
import CityCombobox from "@/components/CityCombobox";

/**
 * @todo make the title a link to homepage
 * @todo make theme selector via context
 */
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; lat?: number; lon?: number }>;
}) {
  const params = await searchParams;
  const city = params?.city || undefined;
  const lat = params?.lat || null;
  const lon = params?.lon || null;

  // console.log("in page.tsx: ", lat, lon)
  
  return (
    // <div className="flex sm:grid sm:grid-rows-[1fr_2fr_1fr]">
    <main className="flex flex-col items-center justify-start min-h-screen gap-8 py-8 m-1 bg-blue-950">
      <Link replace href={`/`} className="text-4xl font-bold">
        Weather App
      </Link>
      {/* <CityDatalist /> */}
      <CityCombobox />
      {/* <WeatherComponent city={city} /> */}
      <OneCallAPIComponent city={city} lat={lat} lon={lon} />
      {/* <VCWeatherComponent city={city} /> */}
    </main>
    // </div>
  );
}
