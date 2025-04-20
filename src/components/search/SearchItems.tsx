"use client";

import { Image } from "@heroui/react";
import { YoutubeSearchResponse, QueueItemDbTypes } from "@/data/responseTypes";
import { useState, useCallback } from "react";
import { appStore } from "@/stores/AppStores";
import { addToast } from "@heroui/toast";
import { AddQueueItem } from "@/data/layer/queue";

const SearchItems = ({
  item,
}: {
  item: YoutubeSearchResponse["data"]["items"][0];
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { app, setQueue, setNowPlaying, setIsMusicLoading } = appStore(
    (state) => state,
  );

  // Move handler to useCallback to avoid recreating on every render
  const handleAddToQueue = useCallback(async () => {
    if (isAdded || isLoading) return;

    try {
      setIsLoading(true);

      // Add to queue and await the result
      const [data, error] = await AddQueueItem(item, app.queueId ?? "");

      if (error) {
        addToast({
          title: "Error adding to queue",
          description: error.errors.message,
          variant: "solid",
          color: "danger",
        });
        setIsLoading(false);
        return;
      }

      // Create queue item
      const queueItem: QueueItemDbTypes = {
        ...item,
        id: data?.insert_queue_items_one.id as string,
        videoId: item.id.videoId,
      };

      // Update queue state safely
      const updatedQueue = [...(app.queue ?? []), queueItem];
      setQueue(updatedQueue);

      // If this is the first track or no track is currently playing, play it automatically
      if (!app.nowPlaying || app.queue?.length === 0) {
        setIsMusicLoading(true);
        setNowPlaying(queueItem);
      }

      // Only mark as added and show success after queue is updated
      setIsAdded(true);

      // Show success toast
      addToast({
        title: "Added to queue",
        description: item.title,
        variant: "solid",
        color: "success",
      });
    } catch (err) {
      console.error("Failed to add to queue:", err);
      addToast({
        title: "Error",
        description: "Failed to add to queue",
        variant: "solid",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    app.queue,
    app.queueId,
    app.nowPlaying,
    isAdded,
    isLoading,
    item,
    setQueue,
    setNowPlaying,
    setIsMusicLoading,
  ]);

  return (
    <div
      className={`rounded-lg flex flex-row justify-between h-[80px] items-center hover:bg-zinc-800 transition-all duration-300 cursor-pointer ${
        isAdded ? "hidden" : ""
      } ${isLoading ? "opacity-50" : ""}`}
      onClick={handleAddToQueue}
    >
      <div className="flex flex-row max-w-[calc(100%-80px)]">
        <div className="flex flex-row w-full items-center gap-2 text-white">
          <Image
            alt="Card background"
            className="object-cover rounded-xl w-[80px] h-[80px] min-w-[80px] min-h-[80px] p-2"
            src={item.snippet.thumbnails.url}
            width={80}
            height={80}
          />
          <div className="flex flex-col overflow-hidden text-ellipsis">
            <h4 className="font-bold text-large overflow-hidden whitespace-nowrap text-ellipsis">
              {item.title}
            </h4>
            <p className="text-sm text-zinc-400 overflow-hidden whitespace-nowrap text-ellipsis">
              {item.snippet.publishedAt}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-sm text-zinc-400 overflow-hidden whitespace-nowrap text-ellipsis px-3">
          {item.snippet.duration}
        </p>
      </div>
    </div>
  );
};

export default SearchItems;
