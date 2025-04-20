"use client";

import { Image, Spinner } from "@heroui/react";
import { appStore } from "@/stores/AppStores";
import { GetQueueByUserResponse, QueueItemTypes } from "@/data/responseTypes";
import { useMemo, MouseEvent } from "react";

const QueueItem = ({
  item,
}: {
  item: GetQueueByUserResponse["queue"][0]["queue_items_aggregate"]["nodes"][0];
}) => {
  const { app, setNowPlaying, setContextMenu, setIsMusicLoading } = appStore(
    (state) => state,
  );

  // Memoize snippet parsing to avoid redundant parsing
  const snippet: QueueItemTypes["snippet"] = useMemo(
    () =>
      typeof item.snippet === "string"
        ? JSON.parse(item.snippet)
        : item.snippet,
    [item.snippet],
  );

  const handleClick = () => {
    if (app.nowPlaying?.id !== item.id) {
      setIsMusicLoading(true);
    }
    setNowPlaying(item);
  };

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      id: item.id ?? null,
      visible: true,
      x: e.pageX,
      y: e.pageY,
    });
  };

  const isCurrentlyLoading =
    app.isMusicLoading && app.nowPlaying?.id === item.id;

  return (
    <div
      className={`rounded-lg flex flex-row justify-between h-[80px] items-center hover:bg-zinc-800 transition-all duration-300 cursor-pointer ${
        app.contextMenu?.id === item.id ? "bg-zinc-800" : ""
      }`}
      data-id={item.id}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div className="flex flex-row flex-grow items-center max-w-[calc(100%-30px)]">
        <div className="relative">
          {isCurrentlyLoading && (
            <Spinner
              size="lg"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            />
          )}
          <Image
            alt="Card background"
            className={`object-cover rounded-xl w-[80px] h-[80px] min-w-[80px] min-h-[80px] p-2 loading-image-${isCurrentlyLoading ? "active" : "inactive"}`}
            style={{
              opacity: isCurrentlyLoading ? 0.4 : 1,
            }}
            src={snippet.thumbnails.url}
            width={80}
            height={80}
          />
        </div>
        <div className="flex flex-col overflow-hidden text-ellipsis py-2 text-white">
          <h4
            className={`font-bold text-large overflow-hidden whitespace-nowrap text-ellipsis px-1 ${
              app.nowPlaying?.id === item.id ? "text-green-500" : ""
            }`}
          >
            {item.title}
          </h4>
          <p className="text-sm text-zinc-400 overflow-hidden whitespace-nowrap text-ellipsis px-1">
            {snippet.duration}
          </p>
        </div>
      </div>
      <div className="flex flex-row items-center w-[30px] justify-end">
        <p
          className="text-xl font-bold text-zinc-400 flex items-center justify-center h-full p-4"
          onClick={(e) => {
            e.stopPropagation();
            handleContextMenu(e);
          }}
        >
          ⋮
        </p>
      </div>
    </div>
  );
};

export default QueueItem;
