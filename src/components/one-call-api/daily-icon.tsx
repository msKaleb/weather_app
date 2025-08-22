export default function DailyWeatherIcon({
  icon,
  condition,
}: {
  icon: string;
  condition: string;
}) {
  return (
    <div className="h-1/3 p-2">
      <i className={`wi weather-icon-min ${icon || "wi-na"}`} />{" "}
      <p className="mt-2 text-center text-[0.9rem]">{condition}</p>
    </div>
  );
}
