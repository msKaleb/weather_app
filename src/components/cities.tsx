"use client";

import { useEffect, useState } from "react";
import { cityType } from "@/lib/utils";

export default function CitySearcher() {
  const [cities, setCities] = useState<cityType[]>([]);
  useEffect(() => {
    fetch("@/data/cities.json")
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error fetching cities:", error));
  }, []);

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log(e.target.value);
  }
  return (
    <>
      {cities.length === 0 ? (
        <p>Loading cities...</p>
      ) : (
        <>
          <datalist className="p-2 border rounded cursor-pointer" id="cities">
            {cities.map((city) => (
              <option
                className="text-background"
                value={city.name}
                key={city.id}
              >
                {city.name}
              </option>
            ))}
          </datalist>
          <label className="flex flex-col">
            Here you can search for cities:
            <input
              type="text"
              onChange={onInputChange}
              list="cities"
              className="p-2 border rounded sm:min-w-60"
              placeholder="Datalist for cities..."
            />
          </label>
        </>
      )}
    </>
  );
}
