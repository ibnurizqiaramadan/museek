"use client";

import { SearchSpotify } from "@/data/layer/search";
import { Input } from "@heroui/react";
import { useState, useCallback } from "react";
import { appStore } from "@/stores/AppStores";

export default function Search() {
  const { setSearch } = appStore((state) => state);
  const [inputSearch, setInputSearch] = useState("");

  const fetchSearch = useCallback(async () => {
    const [response, error] = await SearchSpotify({ query: inputSearch });
    if (error) console.log("error", error);
    setSearch(response);
    // setRefreshQueue(true);
  }, [inputSearch, setSearch]);

  return (
    <div className="flex items-center justify-center">
      <Input
        type="text"
        className="rounded-lg w-2/6 p-0 m-0"
        placeholder="Search"
        onChange={(e) => {
          setInputSearch(e.target.value);
          fetchSearch();
        }}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter") {
        //   }
        // }}
      />
    </div>
  );
}
