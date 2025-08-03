"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedEffect } from "@/lib/hooks";
import { inputClass } from "@/data/constants";
import { cityType } from "@/lib/utils";
import axios from "axios";

export default function CityDatalist() {
  const [cities, setCities] = useState<cityType[]>([]);
  const [query, setQuery] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    const selectedCity = cities.find(
      (city) => e.target.value === `${city.name}, ${city.country}`
    );

    if (selectedCity) {
      const cityToQuery: string =
        `${selectedCity.name}, ${selectedCity.country}`.trim();
      params.set("city", cityToQuery);
      router.push(`/?${params.toString()}`);
    } else {
      params.delete("city");
    }
  }

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (query.trim()) {
        params.set("city", query.trim());
        router.push(`/?${params.toString()}`);
      } else {
        params.delete("city");
        router.push(`/`);
      }
    }
  }

  // TODO: place a search button on input field to trigger search
  return (
    <>
      <datalist id="cities">
        {cities.map((city) => (
          <option key={city.id} value={`${city.name}, ${city.country}`} />
        ))}
      </datalist>
      <input
        className={inputClass}
        type="text"
        list="cities"
        placeholder="Enter a city..."
        onChange={handleChange}
        onKeyUp={handleEnter}
      />
    </>
  );
}
