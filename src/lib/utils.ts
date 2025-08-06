export type cityType1 = {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: { lat: number; lon: number };
};

export type cityType = {
  id: number;
  name: string;
  country: string;
  // lat: number;
  // lon: number;
};

export type geoCodingType = {
  name: string;
  local_names?: { [index: string]: string }[];
  lat: number;
  lon: number;
  country: string;
  state: string;
};

/**
 * @description weather type for openWeather Free Plan
 */
export type weatherType = {
  coord: { lon: number; lat: number };
  weather: [{ id: number; main: string; description: string; icon: string }];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

/*export type _fetchVCWeatherData = {
  queryCost: 1;
  latitude: 53.77237;
  longitude: 18.53357;
  resolvedAddress: "Mieliczki, Skórcz (Gmina), Woj. Pomorskie, Polska";
  address: "mieliczki";
  timezone: "Europe/Warsaw";
  tzoffset: 2;
  description: "Similar temperatures continuing with a chance of rain tomorrow.";
  days: VCDay[];
  alerts: [];
  stations: {
    EPGD: {
      distance: 67768;
      latitude: 54.38;
      longitude: 18.47;
      useCount: 0;
      id: "EPGD";
      name: "EPGD";
      quality: 50;
      contribution: 0;
    };
    D8078: {
      distance: 43648;
      latitude: 53.756;
      longitude: 19.196;
      useCount: 0;
      id: "D8078";
      name: "DW8078 Prabuty PL";
      quality: 0;
      contribution: 0;
    };
  };
  currentConditions: {
    datetime: "08:15:00";
    datetimeEpoch: 1754374500;
    temp: 16.4;
    feelslike: 16.4;
    humidity: 84.7;
    dew: 13.8;
    precip: 0;
    precipprob: 0;
    snow: 0;
    snowdepth: 0;
    preciptype: null;
    windgust: 9.7;
    windspeed: 5.4;
    winddir: 243;
    pressure: 1012;
    visibility: 10;
    cloudcover: 91.7;
    solarradiation: 17;
    solarenergy: 0.1;
    uvindex: 0;
    conditions: "Overcast";
    icon: "cloudy";
    stations: ["D8078", "EPGD"];
    source: "obs";
    sunrise: "05:07:17";
    sunriseEpoch: 1754363237;
    sunset: "20:35:25";
    sunsetEpoch: 1754418925;
    moonphase: 0.37;
  };
};*/
