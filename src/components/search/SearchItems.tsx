"use client";

import { Image } from "@heroui/react";
import { YoutubeSearchResponse } from "@/data/responseTypes";
import { useState } from "react";
import { addToQueue } from "@/data/model/queue.model";
import { appStore } from "@/stores/AppStores";

const SearchItems = ({
  item,
}: {
  item: YoutubeSearchResponse["data"]["items"][0];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { app, setQueue } = appStore((state) => state);
  return (
    <div
      className={`rounded-lg flex flex-row justify-between h-[80px] items-center hover:bg-zinc-800 transition-all duration-300 cursor-pointer ${
        isLoading ? "opacity-50" : ""
      }`}
      onClick={async () => {
        if (isLoading) return;
        setIsLoading(true);
        const queue = {
          id: new Date().getTime().toString(),
          videoId: item.id.videoId,
          title: item.title,
          duration_raw: item.duration_raw,
          snippet: item.snippet,
          views: item.views,
        };
        await addToQueue(queue);
        setQueue([...(app.queue ?? []), queue]);
        setIsLoading(false);
      }}
    >
      <div className="flex flex-row w-full items-center gap-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl w-[80px] h-[80px] p-2"
          src={item.snippet.thumbnails.url}
          width={80}
          height={80}
        />
        <div className="flex flex-col max-w-[calc(100%-80px)] overflow-hidden text-ellipsis">
          <h4 className="font-bold text-large max-w-[calc(100%-80px) overflow-hidden whitespace-nowrap text-ellipsis">
            {item.title}
          </h4>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-sm text-zinc-400 overflow-hidden whitespace-nowrap text-ellipsis px-3">
          {item.duration_raw}
        </p>
      </div>
    </div>
  );
};

export default SearchItems;
