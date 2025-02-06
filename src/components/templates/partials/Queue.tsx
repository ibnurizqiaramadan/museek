"use client";

import { useEffect } from "react";
import { getAccessToken } from "@/data/layer/auth";
import { getQueue } from "@/data/layer/player";
import QueueItem from "@/components/queue/QueueItem";
import { appStore } from "@/stores/AppStores";

export default function Queue() {
  const { app, setQueue } = appStore((state) => state);

  useEffect(() => {
    const fetchQueue = async (accessToken: string | null) => {
      if (!accessToken) {
        const [response, error] = await getAccessToken();
        if (!error) {
          fetchQueue(response?.access_token ?? null);
          sessionStorage.setItem("accessToken", response?.access_token ?? "");
          return;
        }
      }

      const [response, error] = await getQueue({
        accessToken: accessToken ?? "",
      });
      if (error?.statusCode === 401) {
        await getAccessToken().then(([response, error]) => {
          if (!error) {
            sessionStorage.setItem("accessToken", response?.access_token ?? "");
            fetchQueue(response?.access_token ?? null);
          }
        });
      }
      setQueue(response);
    };

    fetchQueue(sessionStorage.getItem("accessToken") ?? null);
  }, [setQueue]);

  return (
    <div className="flex flex-col bg-zinc-900 overflow-auto rounded-lg h-full w-1/2 min-w-[500px] p-2">
      <div className="overflow-y-auto max-h-[calc(100vh-186px)]">
        {app?.queue?.currently_playing && (
          <QueueItem
            key={app.queue.currently_playing.id}
            item={app.queue.currently_playing}
          />
        )}
        {app?.queue?.queue?.map((item) => (
          <QueueItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
