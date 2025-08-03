"use client";
import { inputClass } from "@/data/constants";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleSearch = useDebouncedCallback((city: string) => {
    const params = new URLSearchParams(searchParams);
    if (city.trim()) {
      params.set("city", city.trim());
    } else {
      params.delete("city");
    }
    router.push(`/?${params.toString()}`);
  }, 500);

  return (
    <>
      <input
        type="text"
        placeholder="Enter a city..."
        onChange={(e) => handleSearch(e.target.value)}
        className={inputClass}
      />
    </>
  );
}
