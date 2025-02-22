"use client";

import { Image, Spinner } from "@heroui/react";
import { QueueItemType } from "@/data/model/queue.model";
import { appStore } from "@/stores/AppStores";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
const QueueItem = ({ item }: { item: QueueItemType }) => {
  const { app, setNowPlaying, setContextMenu, setIsMusicLoading } = appStore(
    (state) => state,
  );

  const [currentPlaying, setCurrentPlaying] = useLocalStorage(
    `current-playing`,
    app.nowPlaying,
  );

  const isSelected = app.nowPlaying?.videoId === item.videoId;

  useEffect(() => {
    if (currentPlaying) {
      setNowPlaying(currentPlaying);
    }
  }, [currentPlaying, setNowPlaying]);

  return (
    <div
      className={`rounded-lg flex flex-row justify-between h-[80px] items-center hover:bg-zinc-800 transition-all duration-300 cursor-pointer ${
        app.contextMenu.id === item.id ? "bg-zinc-800" : ""
      }`}
      data-id={item.id}
      onClick={() => {
        setNowPlaying(item);
        setCurrentPlaying(item);
        if (app.nowPlaying?.videoId !== item.videoId) {
          setIsMusicLoading(true);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setContextMenu({
          id: item.id,
          visible: true,
          x: e.pageX,
          y: e.pageY,
        });
      }}
    >
      <div className="flex flex-row flex-grow items-center max-w-[calc(100%-30px)]">
        <div className="relative">
          <Spinner
            size="lg"
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 ${
              isSelected && app.isMusicLoading ? "block" : "hidden"
            } `}
          />
          <div
            className={`${isSelected && app.isMusicLoading ? "opacity-40" : ""}`}
          >
            <Image
              alt="Card background"
              className="object-cover rounded-xl w-[80px] h-[80px] min-w-[80px] min-h-[80px] p-2"
              src={item.snippet.thumbnails.url}
              width={80}
              height={80}
            />
          </div>
        </div>
        <div className="flex flex-col overflow-hidden text-ellipsis py-2 text-white">
          <h4
            className={`font-bold text-large overflow-hidden whitespace-nowrap text-ellipsis px-1 ${
              isSelected && "text-green-500"
            }`}
          >
            {item.title}
          </h4>
          <p className="text-sm text-zinc-400 overflow-hidden whitespace-nowrap text-ellipsis px-1">
            {item.snippet.duration}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center w-[30px] justify-end">
        <p
          className="text-xl font-bold text-zinc-400 flex items-center justify-center h-full p-4"
          onClick={(e) => {
            e.stopPropagation();
            setContextMenu({
              id: item.id,
              visible: true,
              x: e.pageX,
              y: e.pageY,
            });
          }}
        >
          ⋮
        </p>
      </div>
    </div>
  );
};

export default QueueItem;
