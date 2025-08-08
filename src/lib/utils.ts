/* export type cityType1 = {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: { lat: number; lon: number };
}; */

export type TempUnit = "°C" | "°F" | "°K";

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

export type LanguageCode =
  | "sq" // Albanian
  | "af" // Afrikaans
  | "ar" // Arabic
  | "az" // Azerbaijani
  | "eu" // Basque
  | "be" // Belarusian
  | "bg" // Bulgarian
  | "ca" // Catalan
  | "zh_cn" // Chinese Simplified
  | "zh_tw" // Chinese Traditional
  | "hr" // Croatian
  | "cz" // Czech
  | "da" // Danish
  | "nl" // Dutch
  | "en" // English
  | "fi" // Finnish
  | "fr" // French
  | "gl" // Galician
  | "de" // German
  | "el" // Greek
  | "he" // Hebrew
  | "hi" // Hindi
  | "hu" // Hungarian
  | "is" // Icelandic
  | "id" // Indonesian
  | "it" // Italian
  | "ja" // Japanese
  | "kr" // Korean
  | "ku" // Kurmanji (Kurdish)
  | "la" // Latvian
  | "lt" // Lithuanian
  | "mk" // Macedonian
  | "no" // Norwegian
  | "fa" // Persian (Farsi)
  | "pl" // Polish
  | "pt" // Portuguese
  | "pt_br" // Português Brasil
  | "ro" // Romanian
  | "ru" // Russian
  | "sr" // Serbian
  | "sk" // Slovak
  | "sl" // Slovenian
  | "sp" // Spanish (alternative code)
  | "es" // Spanish (alternative code)
  | "sv" // Swedish (alternative code)
  | "se" // Swedish (alternative code)
  | "th" // Thai
  | "tr" // Turkish
  | "ua" // Ukrainian (alternative code)
  | "uk" // Ukrainian (alternative code)
  | "vi" // Vietnamese
  | "zu"; // Zulu
