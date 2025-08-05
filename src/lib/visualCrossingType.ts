export type VCHour = {
  datetime: string; // "HH:MM:SS" format
  datetimeEpoch: number;
  temp: number;
  feelslike: number;
  humidity: number;
  dew: number;
  precip: number;
  precipprob: number;
  snow: number;
  snowdepth: number;
  preciptype: string[] | null;
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  visibility: number;
  cloudcover: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  severerisk: number;
  conditions: string;
  icon: string;
  stations: string[];
  source: string;
};

export type VCDay = {
  datetime: string; // "YYYY-MM-DD"
  datetimeEpoch: number;
  tempmax: number;
  tempmin: number;
  temp: number;
  feelslikemax: number;
  feelslikemin: number;
  feelslike: number;
  dew: number;
  humidity: number;
  precip: number;
  precipprob: number;
  precipcover: number;
  preciptype: ("rain" | "snow" | "ice" | "freezingrain" | "sleet")[] | null;
  snow: number;
  snowdepth: number;
  windgust: number;
  windspeed: number;
  winddir: number;
  pressure: number;
  cloudcover: number;
  visibility: number;
  solarradiation: number;
  solarenergy: number;
  uvindex: number;
  severerisk: number;
  sunrise: string; // "HH:MM:SS"
  sunriseEpoch: number;
  sunset: string; // "HH:MM:SS"
  sunsetEpoch: number;
  moonphase: number;
  conditions: string;
  description: string;
  icon: string;
  stations: string[];
  source: "comb" | "fcst" | "obs" | "stat";
  hours: VCHour[];
};


export type VCWeatherType = {
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  days: VCDay[];
  stations: Record<string, {
    distance: number;
    latitude: number;
    longitude: number;
    useCount: number;
    id: string;
    name: string;
    quality: number;
    contribution: number;
  }>;
  currentConditions: VCHour; // Current hour's data
};