"use client";

import { appStore } from "@/stores/AppStores";
import SearchItems from "@/components/search/SearchItems";
export default function Sidebar() {
  const { app } = appStore((state) => state);
  return (
    <div className="bg-zinc-900 rounded-lg h-full w-full p-2">
      <div className="overflow-y-auto max-h-[calc(100vh-186px)]">
        {app?.search?.tracks?.items.map((item, index) => (
          <SearchItems key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
