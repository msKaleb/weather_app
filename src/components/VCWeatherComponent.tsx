import { fetchVCWeatherData } from "@/lib/actions";

// =================================================================================================
//                                        VCWeatherComponent
// =================================================================================================
/**
 * @description fetches data from weather.visualcrossing.com
 */
export default async function VCWeatherComponent({
  city,
}: {
  city?: string | undefined;
}) {
  const data = await fetchVCWeatherData(city);
  // console.log("VCWeatherComponent: ", data?.resolvedAddress);

  return (
    <p>
      VCWeatherComponent: {data?.address}
      <br />
      {data?.resolvedAddress}
      <br />
      {data?.currentConditions.conditions}
    </p>
  );
}
