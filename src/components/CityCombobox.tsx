"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useRef } from "react";
import { useDebouncedEffect } from "@/lib/hooks";
import { inputClass } from "@/data/constants";
import { cityType, geoCodingType } from "@/lib/types";
// import axios from "axios";
import { useCombobox } from "downshift";
// import { getGeoCodeCities } from "@/lib/actions";

export default function CityCombobox() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  const [cities, setCities] = useState<cityType[]>([]);
  const [query, setQuery] = useState<string>("");
  const [hasSelectedItem, setHasSelectedItem] = useState(false);

  const path = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  function handleSelect(city: cityType | null) {
    if (city) {
      params.set("city", `${city.name}, ${city.country}`);
      city.lat && params.set("lat", city.lat.toString());
      city.lon && params.set("lon", city.lon.toString());
      replace(`${path}?${params.toString()}`);
    } else {
      params.delete("city");
      params.delete("lat");
      params.delete("lon");
    }
  }

  const {
    isOpen,
    highlightedIndex,
    getMenuProps,
    getItemProps,
    getInputProps,
    getToggleButtonProps,
  } = useCombobox({
    items: cities,
    inputValue: query,
    onStateChange(changes) {
      if (changes.selectedItem) {
        setHasSelectedItem(true);
      } else {
        setHasSelectedItem(false);
      }
    },
    onInputValueChange({ inputValue }) {
      setQuery(inputValue ?? "");
    },
    onSelectedItemChange({ selectedItem, type }) {
      handleSelect(selectedItem);
      setHasSelectedItem(false);

      setTimeout(() => {
        if (isMobile) {
          inputRef.current?.blur();
        }
        buttonRef.current?.click();
      }, 50);
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
          /* const { data }: { data: cityType[] } = await axios.get(uriQuery);
          setCities(data); */
          const response = await fetch(uriQuery);
          const data: cityType[] = await response.json();
          setCities(data);

          // if there is no match in cities.json try using geoCode =================================
          if (!data.length && !cities.length) {
            const geoCodeQuery = `/api/geoCode?q=${encodeURIComponent(
              query.trim(),
            )}`;
            /* const { data: geoData }: { data: geoCodingType[] } =
              await axios.get(geoCodeQuery); */
            const response = await fetch(geoCodeQuery);
            const geoData: geoCodingType[] = await response.json();

            const geoCities: cityType[] = geoData.map((city, i) => ({
              id: i,
              name: city.name,
              country: city.country,
              lat: city.lat,
              lon: city.lon,
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
    300,
  ); // end of debounced effect

  return (
    <div className="w-[90%] sm:max-w-[400px]">
      <div id="combobox">
        <div id="input-and-button" className={`relative mx-auto`}>
          <input
            {...getInputProps({
              placeholder: "Search cities...",
              className: `${inputClass} w-full`,
              value: query,
              ref: inputRef,
            })}
            onKeyUp={(e) => {
              if (e.key === "Enter" && !hasSelectedItem) {
                setHasSelectedItem(false);
                params.set("city", query);
                params.delete("lat");
                params.delete("lon");
                replace(`${path}?${params.toString()}`);
              }
            }}
          />
          {query ? (
            <button
              ref={buttonRef}
              onClick={() => setQuery("")}
              className="absolute top-1 right-8 bottom-1 px-2 hover:cursor-pointer"
            >
              x
            </button>
          ) : (
            ""
          )}
          <button
            className="absolute top-1 right-2 bottom-1 px-2 text-xl hover:cursor-pointer"
            {...getToggleButtonProps()}
          >
            {isOpen ? "↑" : "↓"}
          </button>
        </div>
      </div>

      <ul
        className={`bg-input z-10 max-h-50 overflow-scroll sm:min-w-60 ${
          !(isOpen && cities.length) && "hidden"
        }`}
        {...getMenuProps()}
      >
        {cities.map((city, index) => (
          <li
            className={`p-2 hover:cursor-pointer ${
              highlightedIndex === index && "bg-primary-foreground"
            }`}
            key={city.id}
            {...getItemProps({ item: city, index })} // it expects {item, index}
          >{`${city.name}, ${city.country}`}</li>
        ))}
      </ul>
    </div>
  );
}
