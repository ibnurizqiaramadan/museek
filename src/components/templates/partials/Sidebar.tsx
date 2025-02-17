"use client";

import { appStore } from "@/stores/AppStores";
import SearchItems from "@/components/search/SearchItems";
import { memo, useEffect } from "react";
import { getPlaylists } from "@/data/layer/player";
import PlaylistItems from "@/components/sidebars/Playlistitems";

const Sidebar = () => {
  const { app, setPlaylists } = appStore((state) => state);

  useEffect(() => {
    getPlaylists().then(([response, error]) => {
      if (error) console.error(error);
      setPlaylists(response);
    });
  }, [setPlaylists]);

  return (
    <div className={`bg-zinc-900 rounded-lg h-full w-full p-2 `}>
      <div className="overflow-y-auto max-h-[calc(100dvh-186px)]">
        <div className="flex flex-col gap-2">
          {app?.search?.tracks?.items.length &&
            app?.search?.tracks?.items.length > 0 && (
              <div className="flex flex-col gap-2">
                <h4 className="text-large font-bold px-2">Search Results</h4>
                {app?.search?.tracks?.items.map((item, index) => (
                  <SearchItems key={index} item={item} />
                ))}
              </div>
            )}
        </div>
        <div className="hidden flex-col gap-2">
          {app.playlists?.items.length && app.playlists?.items.length > 0 && (
            <>
              <h4 className="text-large font-bold pt-2 px-2">
                Xyrus10&apos;s Playlists
              </h4>
              {app?.playlists?.items.map((item, index) => (
                <PlaylistItems key={index} item={item} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Sidebar);
