"use client";

import { Image } from "@heroui/react";
import { Track } from "@/data/responseTypes";
const QueueItem = ({
  item,
  currentPlaying = false,
}: {
  item: Track;
  currentPlaying?: boolean;
}) => {
  return (
    <div className="rounded-lg flex flex-row h-[80px] items-center hover:bg-zinc-800 transition-all duration-300">
      <Image
        alt="Card background"
        className="object-cover rounded-xl w-[80px] h-[80px] min-w-[80px] min-h-[80px] p-2"
        src={item.album.images[0].url}
        width={80}
        height={80}
      />
      <div className="flex flex-col max-w-[calc(100%-80px)] overflow-hidden text-ellipsis py-2">
        <h4
          className={`font-bold text-large overflow-hidden whitespace-nowrap text-ellipsis px-1 ${
            currentPlaying && "text-green-500"
          }`}
        >
          {item.name}
        </h4>
        <p className="text-sm text-zinc-400 overflow-hidden whitespace-nowrap text-ellipsis px-1">
          {item.artists.map((artist) => artist.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default QueueItem;
