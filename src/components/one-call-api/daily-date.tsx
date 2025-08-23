export default function DailyWeatherDate({
  dailyDate,
  currentDate,
}: {
  dailyDate: Date;
  currentDate: Date;
}) {
  return (
    <>
      {dailyDate.getDate() === currentDate.getDate() ? (
        <div className="flex h-1/3 flex-col justify-start">
          <p>Today</p>
          <p className="text-center text-[0.9rem]">
            {dailyDate.toLocaleDateString("en-GB", {
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
        </div>
      ) : (
        <div className="flex h-1/3 flex-col justify-start">
          <p className="text-center">
            {dailyDate.toLocaleDateString("en-GB", {
              weekday: "short",
            })}
          </p>
          <p className="text-center text-[0.9rem]">
            {dailyDate.toLocaleDateString("en-GB", {
              month: "2-digit",
              day: "2-digit",
            })}
          </p>
        </div>
      )}
    </>
  );
}
