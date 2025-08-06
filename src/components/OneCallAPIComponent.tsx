"use client";
import { OpenWeatherOneCallType } from "@/lib/openWeatherOneCallAPI";
import { fetchOpenWeatherOneCallAPI } from "@/lib/actions";
import { useEffect, useState } from "react";
import axios from "axios";
import { geoCodingType } from "@/lib/utils";

export default function OneCallAPIComponent({
  city,
}: {
  city?: string | undefined;
}) {
  const [coords, setCoords] = useState<{ lat: number; lon: number }>({
    lat: 0,
    lon: 0,
  });

  useEffect(() => {
    const fetchCoords = async () => {
      if (!city) {
        console.log("no city");
        return;
      }
      const uriQuery = `/api/geoCode?q=${encodeURIComponent(city.trim())}`;
      const { data }: { data: geoCodingType[] } = await axios.get(uriQuery);
      console.log("useeffect", data);
      setCoords({ lat: data[0].lat, lon: data[0].lon });
    };
    fetchCoords();
  }, [city]);
  // const { data }: { data: OpenWeatherOneCallType } = await axios.get(uriQuery);
  return (
    <p>
      {coords.lat} / {coords.lon}
    </p>
  );
}
