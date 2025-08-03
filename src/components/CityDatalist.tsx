"use client";

import { inputClass } from "@/data/constants";
import { cityType } from "@/lib/utils";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDebouncedEffect } from "@/lib/hooks";

export default function CityDatalist() {
  const [cities, setCities] = useState<cityType[]>([]);
  const [query, setQuery] = useState<string>("");

  useDebouncedEffect(
    () => {
      const fetchCities = async () => {
        let uriQuery = `/api/cities?q=${encodeURIComponent(query.trim())}`;
        if (query.length < 3) {
          setCities([]);
          return;
        }
        try {
          const { data } = await axios.get(uriQuery);
          setCities(data);
        } catch {
          setCities([]);
        }
      };

      fetchCities();
    },
    [query],
    300
  );

  // previous version without custom hook ==========================================================  
  /* useEffect(() => {
    let uriQuery = `/api/cities?q=${encodeURIComponent(query.trim())}`;
    const fetchCitiesDebounced = setTimeout(async () => {
      if (query.length < 3) {
        if (cities.length) {
          setCities([]);
        }
        return;
      }
      try {
        const { data } = await axios.get(uriQuery);
        setCities(data);
      } catch {
        setCities([]);
      } finally {
        console.log("Cities", cities);
      }
    }, 300);

    return () => clearTimeout(fetchCitiesDebounced);
  }, [query]); */

  return (
    <>
      <datalist id="cities">
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}, {city.country}
          </option>
        ))}
      </datalist>
      <input
        className={inputClass}
        type="text"
        list="cities"
        placeholder="Enter a city..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>{query}</p>
    </>
  );
}
