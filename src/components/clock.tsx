import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Clock({
  className,
  timeZone,
  locale,
}: {
  className?: string;
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
    <span className={cn(className)}>
      {time.toLocaleTimeString(locale, { timeZone: timeZone })}
    </span>
  );
}
