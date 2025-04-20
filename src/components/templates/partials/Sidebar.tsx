"use client";

import { appStore } from "@/stores/AppStores";
import SearchItems from "@/components/search/SearchItems";
import { memo } from "react";

const Sidebar = () => {
  const { app } = appStore((state) => state);

  return (
    <div className={`bg-zinc-900 rounded-lg h-full w-full p-2 `}>
      <div className="overflow-y-auto max-h-[calc(100dvh-196px)]">
        <div className="flex flex-col gap-2">
          {app?.search?.data.items.length &&
            app?.search?.data.items.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 className="text-large font-bold px-2">Search Results</h4>
                {app?.search?.data.items.map((item, index) => (
                  <SearchItems key={index} item={item} />
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);
