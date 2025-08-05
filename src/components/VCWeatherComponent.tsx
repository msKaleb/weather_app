import { fetchVCWeatherData } from "@/lib/actions";
// import { VCWeatherType } from "@/lib/visualCrossingType";
import { iconVCDict } from "@/app/dictionary";

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
  if (!data) {
    return <></>;
  }
  const days = data.days;
  const iconClass = `wi ${iconVCDict[data?.days[0].icon] || "wi-na"}`;
  // console.log("VCWeatherComponent: ", data?.resolvedAddress);

  return (
    <div className="flex flex-col justify-start items-center gap-4 border p-2 sm:w-2/5 w-10/12">
      <div className="flex items-center">
        <h1 className="temperature-font">{data.currentConditions.temp.toFixed(0)}</h1>
        <i className={`${iconClass} weather-icon p-2`} />
      </div>
      <div className="w-full flex flex-col items-center">
        <h1 className="text-2xl font-bold">{data?.address}</h1>
        <p>{data?.currentConditions.conditions}</p>
        {/* <p className="text-lg">{data.currentConditions.temp} °C</p> */}
        <ul className="bg-blue-100 rounded-2xl text-background flex overflow-auto max-w-full gap-4 p-4 m-4">
          {days.map((day, i) => (
            <li
              key={i}
              className="odd:bg-blue-200 rounded-4xl p-4 flex flex-col items-center gap-2"
            >
              <i
                className={`wi weather-icon-min ${
                  iconVCDict[data?.days[i].icon] || "wi-na"
                }`}
              />{" "}
              <p>{day.datetime}</p>
              <p>{day.conditions}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
