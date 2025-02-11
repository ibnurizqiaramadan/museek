"use client";

import { Button, Progress } from "@heroui/react";
import Image from "next/image";
import { appStore } from "@/stores/AppStores";
import { getNowPlaying } from "@/data/layer/player";
import { useCallback, useEffect, useState } from "react";
import ListDevice from "@/components/controls/ListDevice";

const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function Controls() {
  const { app, setNowPlaying, setRefreshQueue } = appStore((state) => state);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const fetchNowPlaying = useCallback(async () => {
    const [response, error] = await getNowPlaying();
    if (error) console.error(error);
    if (response) {
      setNowPlaying(response);
      setProgress(response.progress_ms);
      setDuration(response.item.duration_ms);
    }
  }, [setNowPlaying, setProgress, setDuration]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(progress + 1000);
      if (progress >= duration) {
        setProgress(0);
        fetchNowPlaying();
        setRefreshQueue(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [progress, duration, fetchNowPlaying, setRefreshQueue]);

  useEffect(() => {
    fetchNowPlaying();
  }, [fetchNowPlaying]);

  return (
    <div className="flex flex-row justify-between items-center bg-zinc-900 rounded-lg max-h-[80px] flex-grow min-h-[80px] p-2 px-3">
      <div
        className="
        hidden
        flex-row 
        items-center 
        xl:flex
        xl:w-1/3
        lg:flex
        lg:w-1/2
        md:flex
        md:w-1/2
        sm:flex
        sm:w-1/2
        "
      >
        {app?.nowPlaying?.item?.album?.images[0].url ? (
          <>
            <Image
              className="rounded-lg"
              src={app.nowPlaying.item.album.images[0].url}
              alt="Spotify"
              width={60}
              height={60}
            />
            <div className="flex flex-col overflow-hidden text-ellipsis py-2 px-2">
              <h4
                className={`font-bold text-large overflow-hidden whitespace-nowrap text-ellipsis px-1`}
              >
                {app.nowPlaying.item.name}
              </h4>
              <p className="text-sm text-zinc-400 overflow-hidden whitespace-nowrap text-ellipsis px-1">
                {app.nowPlaying.item.artists
                  .map((artist) => artist.name)
                  .join(", ")}
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-row items-center">
            <h4 className="text-large">No song playing</h4>
          </div>
        )}
      </div>
      <div
        className=" 
          flex-col 
          items-center 
          justify-center
          w-full
          xl:w-1/3
          xl:left-1/2
          xl:absolute
          xl:transform 
          xl:-translate-x-1/2
          xl:flex
          lg:flex 
          lg:right-0
          lg:transform 
          lg:w-1/2
          md:flex 
          md:gap-3 
          md:w-1/2
          sm:flex
          sm:gap-3 
          sm:w-1/2
        "
      >
        <div className="flex flex-row items-center justify-center gap-3">
          <Button size="sm">Previous</Button>
          <Button size="sm">Play</Button>
          <Button size="sm">Next</Button>
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <p className="text-sm text-zinc-400">{formatTime(progress)}</p>
          <Progress
            aria-label="Progress"
            size="sm"
            value={progress}
            maxValue={duration}
          />
          <p className="text-sm text-zinc-400">{formatTime(duration)}</p>
        </div>
      </div>
      <div className="hidden flex-row items-center xl:flex justify-end w-1/3">
        <ListDevice />
      </div>
    </div>
  );
}
