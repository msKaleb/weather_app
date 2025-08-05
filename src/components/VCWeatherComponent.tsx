import { fetchVCWeatherData } from "@/lib/actions";

// =================================================================================================
//                                        VCWeatherComponent
// =================================================================================================
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
