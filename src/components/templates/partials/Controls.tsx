"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { appStore } from "@/stores/AppStores";
import ListDevice from "@/components/controls/ListDevice";

export default function Controls() {
  const { app } = appStore((state) => state);
  return (
    <div className="flex flex-row justify-between items-center bg-zinc-900 rounded-lg max-h-[80px] flex-grow min-h-[80px] p-2">
      <div className="flex flex-row items-center w-auto">
        {app?.queue?.currently_playing?.album?.images[0].url ? (
          <>
            <Image
              className="rounded-lg"
              src={app.queue.currently_playing.album.images[0].url}
              alt="Spotify"
              width={60}
              height={60}
            />
            <div className="flex flex-col overflow-hidden text-ellipsis py-2 px-2">
              <h4
                className={`font-bold text-large overflow-hidden whitespace-nowrap text-ellipsis px-1`}
              >
                {app.queue.currently_playing.name}
              </h4>
              <p className="text-sm text-zinc-400 overflow-hidden whitespace-nowrap text-ellipsis px-1">
                {app.queue.currently_playing.artists
                  .map((artist) => artist.name)
                  .join(", ")}
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-row items-center flex-grow">
            <h4 className="text-large">No song playing</h4>
          </div>
        )}
      </div>
      <div className="flex flex-row items-center justify-center gap-3 w-1/3">
        <Button>Previous</Button>
        <Button>Play</Button>
        <Button>Next</Button>
      </div>
      <div className="flex flex-row items-center justify-end w-1/3">
        <ListDevice />
      </div>
    </div>
  );
}
