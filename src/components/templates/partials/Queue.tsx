"use client";

import { useEffect, useRef, useCallback } from "react";
import { getQueue } from "@/data/layer/player";
import QueueItem from "@/components/queue/QueueItem";
import { appStore } from "@/stores/AppStores";

export default function Queue() {
  const { app, setQueue, setRefreshQueue } = appStore((state) => state);
  const prevQueueRef = useRef(app.queue);

  const fetchQueue = useCallback(async () => {
    const [response, error] = await getQueue();
    console.log(response, error);
    console.log("response", response?.currently_playing);
    if (response?.currently_playing == null) return setQueue(null);
    if (JSON.stringify(response) !== JSON.stringify(prevQueueRef.current)) {
      if (response?.queue.length && response?.queue.length > 0) {
        setQueue(response);
        prevQueueRef.current = response;
        return;
      }
      fetchQueue();
    }
  }, [setQueue]);

  useEffect(() => {
    fetchQueue();
  }, [fetchQueue]);

  useEffect(() => {
    if (app.refreshQueue) {
      fetchQueue();
      setRefreshQueue(false);
    }
  }, [app, app.refreshQueue, fetchQueue, setRefreshQueue]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchQueue();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchQueue]);

  return (
    <div
      className={`flex flex-col bg-zinc-900 overflow-auto rounded-lg h-full p-2 ${
        app.isSidebarVisible === false &&
        (app.search?.tracks?.items.length ?? 0) > 0
          ? "hidden"
          : ""
      }`}
    >
      <div className="overflow-y-auto max-h-[calc(100dvh-186px)] max-w-[calc(100%)] overflow-hidden text-ellipsis whitespace-nowrap">
        {app?.queue?.queue?.length && app?.queue?.queue?.length > 0 && (
          <>
            <div>
              <h4 className="text-large font-bold px-2">Now Playing</h4>
              {app?.queue?.currently_playing && (
                <QueueItem
                  key={app.queue.currently_playing.id}
                  item={app.queue.currently_playing}
                  currentPlaying={true}
                />
              )}
            </div>
            <div>
              <h4 className="text-large font-bold px-2">Next Queue</h4>
              {app?.queue?.queue?.map((item, index) => (
                <QueueItem key={index} item={item} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
