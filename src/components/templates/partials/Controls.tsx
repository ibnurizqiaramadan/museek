"use client";

import { Button, Progress } from "@heroui/react";
import Image from "next/image";
import { appStore } from "@/stores/AppStores";
import { useMemo, useState, useEffect, useRef } from "react";

const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function Controls() {
  const { app, setNowPlaying } = appStore((state) => state);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const formattedProgress = useMemo(() => formatTime(progress), [progress]);
  const formattedDuration = useMemo(() => formatTime(duration), [duration]);

  useEffect(() => {
    console.log(app.nowPlaying);
  }, [app.nowPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime * 1000);
      if (audioRef.current.currentTime >= audioRef.current.duration) {
        const currentIndex = app.queue?.findIndex(
          (item) => item.videoId === app.nowPlaying?.videoId,
        );
        const nextIndex =
          currentIndex !== undefined && currentIndex >= 0
            ? currentIndex + 1
            : 0;

        // Check if the next index is within bounds
        if (app.queue && nextIndex < app.queue.length) {
          setNowPlaying(app.queue[nextIndex]);
        } else {
          // If the end of the queue is reached, go back to the first item
          setNowPlaying(app.queue?.[0] || null);
        }
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration * 1000);
    }
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = event.currentTarget;
    const clickPosition =
      event.clientX - progressBar.getBoundingClientRect().left;
    const newTime = (clickPosition / progressBar.clientWidth) * duration; // Calculate new time in seconds
    if (audioRef.current) {
      audioRef.current.currentTime = newTime / 1000; // Set the audio current time in seconds
      setProgress(newTime); // Update progress state
    }
  };

  const handlePlay = () => {
    console.log("Audio is now playing");
    // You can add more actions here if needed
  };

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
        {app?.nowPlaying?.snippet?.thumbnails?.url ? (
          <>
            <Image
              className="rounded-lg"
              src={app.nowPlaying.snippet.thumbnails.url}
              alt="Spotify"
              width={60}
              height={60}
            />
            <div className="flex flex-col overflow-hidden text-ellipsis py-2 px-2">
              <h4
                className={`font-bold text-large overflow-hidden whitespace-nowrap text-ellipsis px-1`}
              >
                {app.nowPlaying.title}
              </h4>
              <p className="text-sm text-zinc-400 overflow-hidden whitespace-nowrap text-ellipsis px-1">
                {app.nowPlaying.snippet.publishedAt}
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
        <div className="hidden flex-row items-center justify-center gap-3">
          <Button size="sm">Previous</Button>
          <Button size="sm">Play</Button>
          <Button size="sm">Next</Button>
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <p className="text-sm text-zinc-400">{formattedProgress}</p>
          <div onClick={handleSeek} style={{ width: "100%" }}>
            <Progress
              aria-labelledby="progress-label"
              size="md"
              value={progress}
              maxValue={duration}
              className="cursor-pointer"
            />
          </div>
          <audio
            ref={audioRef}
            src={`/api/v1/youtube/stream/${app.nowPlaying?.videoId}`}
            controls
            autoPlay
            hidden
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={handlePlay}
          />
          <p className="text-sm text-zinc-400">{formattedDuration}</p>
        </div>
      </div>
    </div>
  );
}
