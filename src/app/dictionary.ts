export const iconDict: { [index: string]: string } = {
  "01d": "wi-day-sunny",
  "01n": "wi-night-clear",
  "02d": "wi-day-cloudy",
  "02n": "wi-night-alt-cloudy",
  "03d": "wi-cloudy",
  "03n": "wi-cloudy",
  "04d": "wi-cloudy-windy",
  "04n": "wi-cloudy-windy",
  "09d": "wi-showers",
  "09n": "wi-showers",
  "10d": "wi-day-rain",
  "10n": "wi-night-alt-rain",
  "11d": "wi-thunderstorm",
  "11n": "wi-thunderstorm",
  "13d": "wi-snow",
  "13n": "wi-snow",
  "50d": "wi-fog",
  "50n": "wi-fog",
};

export const iconVCDict: { [index: string]: string } = {
  "snow": "wi-snow",  // Amount of snow is greater than zero
  "snow-showers-day": "wi-day-snow", //	Periods of snow during the day
  "snow-showers-night": "wi-night-alt-snow", //	Periods of snow during the night
  "thunder-rain": "wi-storm-showers", //	Thunderstorms throughout the day or night
  "thunder-showers-day": "wi-day-thunderstorm", //	Possible thunderstorms throughout the day
  "thunder-showers-night": "wi-night-alt-thunderstorm", //	Possible thunderstorms throughout the night
  "rain": "wi-rain-mix", //	Amount of rainfall is greater than zero
  "showers-day": "wi-day-rain-mix", //	Rain showers during the day
  "showers-night": "wi-night-alt-rain-mix", //	Rain showers during the night
  "fog": "wi-fog", //	Visibility is low (lower than one kilometer or mile)
  "wind": "wi-strong-wind", //	Wind speed is high (greater than 30 kph or mph)
  "cloudy": "wi-cloudy", //	Cloud cover is greater than 90% cover
  "partly-cloudy-day": "wi-day-cloudy", //	Cloud cover is greater than 20% cover during day time.
  "partly-cloudy-night": "wi-night-alt-cloudy", //	Cloud cover is greater than 20% cover during night time.
  "clear-day": "wi-day-sunny", //	Cloud cover is less than 20% cover during day time
  "clear-night": "wi-night-clear", // Cloud cover is less than 20% cover during night time
};
