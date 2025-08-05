"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedEffect } from "@/lib/hooks";
import { inputClass } from "@/data/constants";
import { cityType } from "@/lib/utils";
import axios from "axios";

/**
 * @todo place a search button on input field to trigger search
 * @todo if there are no search params, clean the input (input's tag value)
 * @todo datalist not working on smartphone
 */
export default function CityDatalist() {
  const [cities, setCities] = useState<cityType[]>([]);
  const [query, setQuery] = useState<string>("");

  const path = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  useDebouncedEffect(
    () => {
      const fetchCities = async () => {
        const uriQuery = `/api/cities?q=${encodeURIComponent(query.trim())}`;
        // const uriQuery = `/api/geoCode?q=${encodeURIComponent(query.trim())}`;
        if (query.length < 3) {
          setCities([]);
          return;
        }
        try {
          const { data }: { data: cityType[] } = await axios.get(uriQuery);
          // console.log(`geoCode: ${JSON.stringify(data)}`);
          console.log(`data: ${JSON.stringify(data)}`);
          // TODO: if data === [], use geoCode for a second try
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
      replace(`${path}?${params.toString()}`);
    } else {
      params.delete("city");
    }
  }

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (query.trim()) {
        params.set("city", query.trim());
        replace(`/?${params.toString()}`);
      } else {
        params.delete("city");
        replace(path);
      }
    }
  }

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
