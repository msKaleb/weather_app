import { OpenWeatherOneCallType } from "@/lib/openWeatherOneCallAPI";
import { frameClass } from "@/data/tw-styles";
import { AlertTriangle } from "lucide-react";

export default function Alerts({
  weather,
}: {
  weather: OpenWeatherOneCallType;
}) {
  const alerts = weather.alerts;

  if (!alerts) return;

  return (
    <div
      className={`${frameClass} bg-destructive text-background m-4 min-h-20 overflow-auto p-4 font-semibold`}
    >
      <ul>
        {alerts.map((alert, index) => {
          const alertStart = new Date(alert.start * 1000).toLocaleDateString(
            "en-GB",
            {
              timeZone: weather.timezone,
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "short",
            },
          );
          const alertEnd = new Date(alert.end * 1000).toLocaleDateString(
            "en-GB",
            {
              timeZone: weather.timezone,
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "short",
            },
          );
          return (
            <li key={index}>
              <div className="flex items-center gap-2">
                <AlertTriangle size={45} />
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <p>
                    Start: <span className="font-bold">{alertStart}</span>
                  </p>
                  <p>
                    End: <span className="font-bold">{alertEnd}</span>
                  </p>
                </div>
              </div>
              <p className="font-bold">{alert.event}</p>
              <p>{alert.description}</p>
              <p className="text-muted font-mono text-xs whitespace-pre-wrap">
                {"  "}
                {alert.sender_name}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
