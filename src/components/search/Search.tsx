"use client";

import { SearchSpotify } from "@/data/layer/search";
import { Input } from "@heroui/react";
import { useState, useCallback } from "react";
import { appStore } from "@/stores/AppStores";

export default function Search() {
  const { setSearch, setRefreshQueue } = appStore((state) => state);
  const [inputSearch, setInputSearch] = useState("");

  const fetchSearch = useCallback(async () => {
    const [response, error] = await SearchSpotify({ query: inputSearch });
    if (error) console.log("error", error);
    setSearch(response);
    setRefreshQueue(true);
  }, [inputSearch, setRefreshQueue, setSearch]);

  return (
    <div className="flex flex-grow items-center justify-center">
      <Input
        type="text"
        className="rounded-lg w-full md:w-1/2 lg:w-1/3 p-0 m-0"
        placeholder="Search"
        onChange={(e) => {
          setInputSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchSearch();
          }
        }}
      />
    </div>
  );
}
