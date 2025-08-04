import WeatherComponent from "@/components/WeatherComponent";
import CityDatalist from "@/components/CityDatalist";

/**
 * @todo make the title a link to homepage
 * @todo make theme selector via context
 */
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const params = await searchParams;
  const city = params?.city || undefined;

  return (
    <div className="grid grid-rows-[1fr_2fr_1fr]">
      <main className="flex flex-col items-center justify-between gap-8 p-8">
        <h1 className="text-4xl font-bold">Weather App</h1>
        <CityDatalist />
        <WeatherComponent city={city} />
      </main>
    </div>
  );
}
