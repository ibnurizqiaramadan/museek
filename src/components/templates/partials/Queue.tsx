"use client";

import { appStore } from "@/stores/AppStores";
import QueueItem from "@/components/queue/QueueItem";
import { useEffect } from "react";
import { getQueue } from "@/data/model/queue.model";

export default function Queue() {
  const { app, setQueue } = appStore((state) => state);

  useEffect(() => {
    getQueue().then((items) => {
      setQueue(items);
      console.log(items);
    });
  }, [setQueue]);

  return (
    <div
      className={`flex flex-col bg-zinc-900 overflow-auto rounded-lg h-full p-2 ${
        app.isSidebarVisible === false &&
        (app.search?.data.items.length ?? 0) > 0
          ? "hidden"
          : ""
      }`}
    >
      <div className="overflow-y-auto max-h-[calc(100dvh-186px)] max-w-[calc(100%)] overflow-hidden text-ellipsis whitespace-nowrap">
        <div
          className={`${app.queue?.length && app.queue?.length > 0 ? "" : "hidden"}`}
        >
          <>
            {app.queue?.map((item) => <QueueItem key={item.id} item={item} />)}
          </>
        </div>
      </div>
    </div>
  );
}
