"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CitySearch() {
  const [city, setCity] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      router.push(`/?city=${encodeURIComponent(city.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-4">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </form>
  );
}