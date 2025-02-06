"use client";

import { useEffect, useState } from "react";
import { getAccessToken } from "@/data/layer/auth";
import { QueueResponse } from "@/data/responseTypes";
import QueueItem from "@/components/queue/QueueItem";
// import data from "./data.json";
import { DataRequest } from "@/data/helper";

export default function Queue() {
  const [queue, setQueue] = useState<QueueResponse | null>(null);

  useEffect(() => {
    const fetchQueue = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        const [response, error] = await getAccessToken();
        if (!error)
          sessionStorage.setItem("accessToken", response?.access_token ?? "");
      }

      const [response, error] = await DataRequest({
        url: "me/player/queue",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (error?.statusCode === 401) {
        const [response, error] = await getAccessToken();
        if (!error) {
          sessionStorage.setItem("accessToken", response?.access_token ?? "");
          fetchQueue();
        }
      }
      setQueue(response as QueueResponse);
    };

    fetchQueue();
  }, []);

  return (
    <div className="flex flex-col bg-zinc-900 overflow-auto rounded-lg h-full w-1/2 min-w-[500px] p-2">
      <div className="overflow-y-auto max-h-[calc(100vh-186px)]">
        {queue?.currently_playing && (
          <QueueItem
            key={queue.currently_playing.id}
            item={queue.currently_playing}
          />
        )}
        {queue?.queue.map((item) => <QueueItem key={item.id} item={item} />)}
      </div>
    </div>
  );
}
