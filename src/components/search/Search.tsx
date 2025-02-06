"use client";

import { getAccessToken } from "@/data/layer/auth";
import { SearchSpotify } from "@/data/layer/search";
import { Input } from "@heroui/react";
import { useState, useCallback } from "react";
import { appStore } from "@/stores/AppStores";

export default function Search() {
  const { setSearch } = appStore((state) => state);
  const [inputSearch, setInputSearch] = useState("");

  const fetchSearch = useCallback(async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      const [response, error] = await getAccessToken();
      if (!error)
        sessionStorage.setItem("accessToken", response?.access_token ?? "");
    }

    const [response, error] = await SearchSpotify({
      accessToken: accessToken ?? "",
      query: inputSearch,
    });
    if (error?.statusCode === 401) {
      const [response, error] = await getAccessToken();
      if (!error) {
        sessionStorage.setItem("accessToken", response?.access_token ?? "");
        fetchSearch();
      }
    }
    setSearch(response);
  }, [inputSearch, setSearch]);

  return (
    <div className="flex items-center justify-center">
      <Input
        type="text"
        className="rounded-lg w-2/6 p-0 m-0"
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
