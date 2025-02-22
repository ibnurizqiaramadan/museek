"use client";

import Image from "next/image";
import { appStore } from "@/stores/AppStores";
import { useMemo, useState, useRef, useEffect } from "react";
import { Slider } from "@heroui/react";
import { useLocalStorage } from "usehooks-ts";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import {
  RxSpeakerOff,
  RxSpeakerLoud,
  RxSpeakerModerate,
  RxSpeakerQuiet,
} from "react-icons/rx";

const formatTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export default function Controls() {
  const { app, setNowPlaying, setIsMusicPlaying, setIsMusicLoading } = appStore(
    (state) => state,
  );
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState<number>(50);
  const [savedVolume, setSavedVolume] = useLocalStorage("volume", 50);
  const [savedProgress, setSavedProgress] = useLocalStorage("progress", 0);
  const [firstLoad, setFirstLoad] = useState(false);

  const [currentPlaying, setCurrentPlaying] = useLocalStorage(
    `current-playing`,
    app.nowPlaying,
  );

  useEffect(() => {
    if (currentPlaying) {
      setNowPlaying(currentPlaying);
    }
  }, [currentPlaying, setNowPlaying]);

  useEffect(() => {
    if (savedProgress) {
      setProgress(savedProgress);
    }
  }, [savedProgress]);

  useEffect(() => {
    if (savedVolume) {
      setVolume(savedVolume);
    }
  }, [savedVolume]);

  useEffect(() => {
    if (app.isMusicPlaying) {
      if (audioRef.current) {
        audioRef.current.play();
        if (savedProgress && !firstLoad) {
          audioRef.current.currentTime = savedProgress / 1000;
          setFirstLoad(true);
        }
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [app.isMusicPlaying, firstLoad, savedProgress]);

  const formattedProgress = useMemo(() => formatTime(progress), [progress]);
  const formattedDuration = useMemo(() => formatTime(duration), [duration]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime * 1000;
      setSavedProgress(currentTime);
      if (currentTime >= duration) {
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

  const handlePlay = () => {
    if (audioRef.current) {
      if (app.isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        audioRef.current.volume = volume / 100;
        setIsMusicLoading(false);
      }
      setIsMusicPlaying(!app.isMusicPlaying);
      setCurrentPlaying(app.nowPlaying);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const newTime = (clickPosition / progressBar.clientWidth) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime / 1000;
      setProgress(newTime);
    }
  };

  const handleSliderChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value / 1000;
      setProgress(value);
    }
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    setSavedVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
  };

  const handleNext = () => {
    const { queue, nowPlaying } = app;
    const currentIndex =
      queue?.findIndex((item) => item.videoId === nowPlaying?.videoId) ?? -1;
    const nextIndex = (currentIndex + 1) % (queue?.length || 1);
    setNowPlaying(queue?.[nextIndex] || null);
  };

  const handlePrevious = () => {
    const { queue, nowPlaying } = app;
    const currentIndex =
      queue?.findIndex((item) => item.videoId === nowPlaying?.videoId) ?? 0;
    const prevIndex =
      (currentIndex - 1 + (queue?.length || 1)) % (queue?.length || 1);
    setNowPlaying(queue?.[prevIndex] || null);
  };

  return (
    <div className="flex flex-row justify-between items-center bg-zinc-900 rounded-lg max-h-[90px] flex-grow min-h-[90px] px-6">
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
        <div className="flex flex-row items-center justify-center gap-2">
          <div
            className="rounded-full p-2 bg-zinc-600 cursor-pointer"
            onClick={handlePrevious}
          >
            <FaStepBackward />
          </div>
          <div
            className="rounded-full p-3 bg-zinc-600 cursor-pointer"
            onClick={handlePlay}
          >
            {app.isMusicPlaying ? <FaPause /> : <FaPlay />}
          </div>
          <div
            className="rounded-full p-2 bg-zinc-600 cursor-pointer"
            onClick={handleNext}
          >
            <FaStepForward />
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <p className="text-sm text-zinc-400">{formattedProgress}</p>
          <div style={{ width: "100%" }}>
            <Slider
              aria-labelledby="progress-label"
              size="sm"
              value={progress}
              maxValue={duration}
              className="cursor-pointer"
              onClick={handleProgressClick}
              onChange={(value) => {
                handleSliderChange(value as number);
              }}
            />
          </div>
          {app.nowPlaying?.videoId && (
            <audio
              ref={audioRef}
              src={`/api/v1/youtube/stream/${app.nowPlaying?.videoId}`}
              controls
              autoPlay
              hidden
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={(e) => {
                e.currentTarget.volume = volume / 100;
                setIsMusicPlaying(true);
                setIsMusicLoading(false);
                setCurrentPlaying(app.nowPlaying);
              }}
              onPause={(e) => {
                e.currentTarget.volume = 0;
                setIsMusicPlaying(false);
                setIsMusicLoading(false);
              }}
            />
          )}
          <p className="text-sm text-zinc-400">{formattedDuration}</p>
        </div>
      </div>
      <div className="hidden flex-row items-center xl:flex justify-end w-1/3">
        {volume === 0 ? (
          <RxSpeakerOff className="text-zinc-400 text-2xl" />
        ) : volume < 30 ? (
          <RxSpeakerQuiet className="text-zinc-400 text-2xl" />
        ) : volume < 60 ? (
          <RxSpeakerModerate className="text-zinc-400 text-2xl" />
        ) : (
          <RxSpeakerLoud className="text-zinc-400 text-2xl" />
        )}
        <Slider
          aria-labelledby="volume-label"
          size="sm"
          value={volume}
          maxValue={100}
          minValue={0}
          step={1}
          showTooltip={true}
          className="cursor-pointer max-w-[200px] ml-2"
          onChange={(value) => {
            handleVolumeChange(value as number);
          }}
        />
      </div>
    </div>
  );
}
