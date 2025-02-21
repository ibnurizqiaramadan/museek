"use client";

import { Image } from "@heroui/react";
import { QueueItemType } from "@/data/model/queue.model";
import { appStore } from "@/stores/AppStores";
const QueueItem = ({ item }: { item: QueueItemType }) => {
  const { app, setNowPlaying } = appStore((state) => state);
  return (
    <div
      className="rounded-lg flex flex-row h-[80px] items-center hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
      onClick={() => {
        setNowPlaying(item);
      }}
    >
      <Image
        alt="Card background"
        className="object-cover rounded-xl w-[80px] h-[80px] min-w-[80px] min-h-[80px] p-2"
        src={item.snippet.thumbnails.url}
        width={80}
        height={80}
      />
      <div className="flex flex-col max-w-[calc(100%-80px)] overflow-hidden text-ellipsis py-2">
        <h4
          className={`font-bold text-large overflow-hidden whitespace-nowrap text-ellipsis px-1 ${
            app.nowPlaying?.videoId === item.videoId && "text-green-500"
          }`}
        >
          {item.title}
        </h4>
        <p className="text-sm text-zinc-400 overflow-hidden whitespace-nowrap text-ellipsis px-1">
          {/* {item.snippet.title} */}
        </p>
      </div>
    </div>
  );
};

export default QueueItem;
