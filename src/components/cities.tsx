"use client";

import { useEffect, useState } from "react";
import { cityType } from "@/lib/utils";

export default function CitySearcher() {
  const [cities, setCities] = useState<cityType[]>([]);
  useEffect(() => {
    fetch("/cities.json")
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log(e.target.value);
  }
  return (
    <>
      <h1 className="text-4xl font-bold">Weather App</h1>

      {cities.length === 0 ? (
        <p>Loading cities...</p>
      ) : (
        <datalist className="p-2 border rounded cursor-pointer" id="cities">
          {cities.map((city, i) => (
            <option className="text-background" value={city.name} key={i}>
              {city.name}
            </option>
          ))}
        </datalist>
      )}
      <input
        type="text"
        onChange={onInputChange}
        list="cities"
        className="p-2 border rounded"
        placeholder="Search for a city..."
      />
      
    </>
  );
}
