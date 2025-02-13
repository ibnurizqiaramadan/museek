"use client";

import { SearchSpotify } from "@/data/layer/search";
import { Input } from "@heroui/react";
import { useState, useCallback } from "react";
import { appStore } from "@/stores/AppStores";

export default function Search() {
  const { setSearch } = appStore((state) => state);
  const [inputSearch, setInputSearch] = useState("");

  const fetchSearch = useCallback(
    async (query: string) => {
      const [response, error] = await SearchSpotify({ query });
      if (error) console.log("error", error);
      if (query.length > 0) {
        setSearch(response);
      }
    },
    [setSearch],
  );

  return (
    <div className="flex flex-grow items-center justify-center">
      <Input
        type="text"
        className="rounded-lg w-full md:w-1/2 lg:w-1/3 p-0 m-0"
        placeholder="Search"
        defaultValue={inputSearch}
        onKeyUp={(e) => {
          const value = e.currentTarget.value.trim().replace(/\s+/g, " ");
          setInputSearch(value);
          if (value.length === 0) setSearch(null);
          if (value.length > 0) {
            fetchSearch(value);
          }
        }}
      />
    </div>
  );
}
