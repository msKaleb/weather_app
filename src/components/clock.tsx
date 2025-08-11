import { useEffect, useState } from "react";

export default function Clock({
  timeZone,
  locale,
}: {
  timeZone: string;
  locale?: string;
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  return (
    <p>{time.toLocaleTimeString(locale, { timeZone: timeZone })}</p>
  );
  //   return <p>{time.getHours()}:{time.getMinutes()}:{time.getSeconds()}</p>
}
