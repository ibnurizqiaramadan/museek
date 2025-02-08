"use client";

import { useEffect, useRef, useCallback } from "react";
import { getAccessToken } from "@/data/layer/auth";
import { getQueue } from "@/data/layer/player";
import QueueItem from "@/components/queue/QueueItem";
import { appStore } from "@/stores/AppStores";

export default function Queue() {
  const { app, setQueue, setRefreshQueue } = appStore((state) => state);
  const prevQueueRef = useRef(app.queue);

  const fetchQueue = useCallback(
    async (accessToken: string | null, useCache = true) => {
      const [response, error] = await getQueue({
        accessToken: accessToken ?? "",
        useCache,
      });
      if (error?.statusCode === 401 || error?.statusCode === 400) {
        await getAccessToken().then(([response, error]) => {
          console.log(response, error);
          if (!error) {
            sessionStorage.setItem("accessToken", response?.access_token ?? "");
            fetchQueue(response?.access_token ?? null);
          }
        });
      }

      if (JSON.stringify(response) !== JSON.stringify(prevQueueRef.current)) {
        console.log(response);
        if (response?.queue.length && response?.queue.length < 0) {
          fetchQueue(sessionStorage.getItem("accessToken") ?? null, false);
        }
        setQueue(response);
        prevQueueRef.current = response;
      }
    },
    [setQueue],
  );

  useEffect(() => {
    fetchQueue(sessionStorage.getItem("accessToken") ?? null);
  }, [fetchQueue]);

  useEffect(() => {
    if (app.refreshQueue) {
      fetchQueue(sessionStorage.getItem("accessToken") ?? null);
      setRefreshQueue(false);
    }
  }, [app, app.refreshQueue, fetchQueue, setRefreshQueue]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchQueue(sessionStorage.getItem("accessToken") ?? null);
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchQueue]);

  return (
    <div className="flex flex-col bg-zinc-900 overflow-auto rounded-lg h-full w-1/2 min-w-[500px] p-2">
      <div className="overflow-y-auto max-h-[calc(100vh-186px)] max-w-[calc(100%)] overflow-hidden text-ellipsis whitespace-nowrap">
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
