"use client";

import { SearchSpotify } from "@/data/layer/search";
import { Input } from "@heroui/react";
import { useCallback, useRef } from "react";
import { appStore } from "@/stores/AppStores";

export default function Search() {
  const { setSearch, setSearchInput, app } = appStore((state) => state);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSearch = useCallback(
    async (query: string) => {
      const [response, error] = await SearchSpotify({ query });
      if (error) console.log("error", error);
      if (query.length > 1) {
        setSearch(response);
      } else {
        setSearch(null);
      }
    },
    [setSearch],
  );

  const debounceFetchSearch = (query: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      fetchSearch(query);
    }, 200);
  };

  return (
    <div className="flex flex-grow items-center justify-center">
      <Input
        type="text"
        className="rounded-lg w-full md:w-1/2 lg:w-1/3 p-0 m-0"
        placeholder="Search"
        defaultValue={app.searchInput}
        onKeyUp={(e) => {
          const value = e.currentTarget.value.trim().replace(/\s+/g, " ");
          setSearchInput(value);
          debounceFetchSearch(value);
        }}
      />
    </div>
  );
}
