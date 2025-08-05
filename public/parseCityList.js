import { readFileSync, writeFileSync } from "fs";

const originalData = JSON.parse(readFileSync("./city.list.json", "utf-8"));
const uniqueCities = [];
const seen = new Set(); // Track seen city+country combinations

const cities = originalData.filter((city) => {
  const key = `${city.name.toLowerCase()}_${city.country.toLowerCase()}`;

  if (!seen.has(key)) {
    seen.add(key);
    uniqueCities.push({
      id: city.id,
      name: city.name,
      country: city.country.toUpperCase(),
      lat: city.coord.lat,
      lon: city.coord.lon
    });
    return true;
  }
  return false;
});

writeFileSync("cities.json", JSON.stringify(uniqueCities, null, 2));
console.log(`Converted ${uniqueCities.length} cities to a simplified format.`);
