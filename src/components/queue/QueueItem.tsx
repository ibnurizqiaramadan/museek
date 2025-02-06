"use client";

import { Image } from "@heroui/react";
import { Track } from "@/data/responseTypes";
const QueueItem = ({ item }: { item: Track }) => {
  return (
    <div className="rounded-lg flex flex-row h-[80px] items-center hover:bg-zinc-800 transition-all duration-300 cursor-pointer">
      <Image
        alt="Card background"
        className="object-cover rounded-xl w-[80px] h-[80px] p-2"
        src={item.album.images[0].url}
        width={80}
        height={80}
      />
      <div className="flex flex-col">
        <h4 className="font-bold text-large">{item.name}</h4>
        <p className="">{item.artists[0].name}</p>
      </div>
    </div>
  );
};

export default QueueItem;
