"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedEffect } from "@/lib/hooks";
import { inputClass } from "@/data/constants";
import { cityType, geoCodingType } from "@/lib/utils";
import axios from "axios";

import { useCombobox } from "downshift";

export default function CityCombobox() {
  const [cities, setCities] = useState<cityType[]>([]);
  const [query, setQuery] = useState<string>("");

  const path = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    items: cities,
    onInputValueChange({ inputValue }) {
      setQuery(inputValue ?? "");
    },
    itemToString(item) {
      return item ? `${item.name}, ${item.country}` : "";
    },
  });

  // debounced useEffect for retrieving list of matching cities ====================================
  useDebouncedEffect(
    () => {
      const fetchCities = async () => {
        const uriQuery = `/api/cities?q=${encodeURIComponent(query.trim())}`;
        if (query.length < 3) {
          setCities([]);
          return;
        }
        try {
          const { data }: { data: cityType[] } = await axios.get(uriQuery);
          // console.log(data.length, "First try") // debugging
          setCities(data);

          // if there is no match in cities.json try using geoCode =================================
          if (!data.length && !cities.length) {
            console.log("Fetching suggestions via geoCode API...");
            const geoCodeQuery = `/api/geoCode?q=${encodeURIComponent(
              query.trim()
            )}&w=false`;
            const { data: geoData }: { data: geoCodingType[] } =
              await axios.get(geoCodeQuery);
            const geoCities: cityType[] = geoData.map((city, i) => ({
              id: i,
              name: city.name,
              country: city.country,
            }));
            setCities(geoCities);
          } // endif
        } catch {
          setCities([]);
        }
      };

      fetchCities();
    },
    [query],
    300
  ); // end of debounced effect

  return (
    <div>
      <div id="combobox">
        <div id="input-and-button" className={`relative`}>
          <input
            {...getInputProps({
              placeholder: "Search cities...",
              className: inputClass,
              value: query,
            })}
          />
          {query ? (
            <button
              onClick={() => setQuery("")}
              className="absolute right-8 top-1 bottom-1 px-2 hover:cursor-pointer"
            >
              🗴
            </button>
          ) : (
            ""
          )}
          <button
            className="absolute right-2 top-1 bottom-1 px-2 hover:cursor-pointer"
            {...getToggleButtonProps()}
          >
            {isOpen ? "↑" : "↓"}
          </button>
        </div>
      </div>
      {/* <p>{cities.length && cities[0].name}</p> */}
      <ul
        className={`absolute bg-white mt-1 max-h-50 overflow-scroll z-10 sm:min-w-60 ${
          !(isOpen && cities.length) && "hidden"
        }`}
        {...getMenuProps()}
      >
        {cities.map((city, index) => (
          <li
            className={`text-black hover:cursor-pointer p-2 ${
              highlightedIndex === index && "bg-blue-300"
            }`}
            key={city.id}
            {...getItemProps({ item: city, index })} // it expects {item, index}
          >{`${city.name}, ${city.country}`}</li>
        ))}
      </ul>
    </div>
  );
}
