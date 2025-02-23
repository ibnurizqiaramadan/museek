"use client";

import { SearchYoutube } from "@/data/layer/search";
import { Input } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { appStore } from "@/stores/AppStores";

export default function Search() {
  const { setSearch, app, setSearchInput } = appStore((state) => state);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [stateSearchInput, setStateSearchInput] = useState(app.searchInput);

  useEffect(() => {
    setStateSearchInput(app.searchInput);
  }, [app.searchInput]);

  const fetchSearch = useCallback(
    async (query: string) => {
      const [response, error] = await SearchYoutube({
        query,
      });
      if (error) console.log("error", error);
      if (query.length > 1) return setSearch(response);
      setSearch(null);
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
        isClearable
        className="rounded-lg w-full md:w-1/2 lg:w-1/3 p-0 m-0"
        placeholder="Search"
        value={stateSearchInput}
        onValueChange={(value) => {
          if (value.length === 0) {
            setStateSearchInput("");
            setSearch(null);
            return;
          }
          setStateSearchInput(value);
          setSearchInput(value);
          debounceFetchSearch(value);
        }}
        onKeyUp={(e) => {
          if (e.key == "Escape") {
            setStateSearchInput("");
            setSearch(null);
          }
        }}
        onClear={() => {
          setStateSearchInput("");
          setSearch(null);
        }}
      />
    </div>
  );
}
