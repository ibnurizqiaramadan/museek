"use client";

import { appStore } from "@/stores/AppStores";
import QueueItem from "@/components/queue/QueueItem";

export default function Queue() {
  const { app } = appStore((state) => state);

  return (
    <div
      className={`flex flex-col bg-zinc-900 overflow-auto rounded-lg h-full p-2 ${
        app.isSidebarVisible === false &&
        (app.search?.data.items.length ?? 0) > 0
          ? "hidden"
          : ""
      }`}
    >
      <div className="overflow-y-auto max-h-[calc(100dvh-196px)] max-w-[calc(100%)] overflow-hidden text-ellipsis whitespace-nowrap">
        <div
          className={`text-zinc-400 text-wrap text-center h-[calc(100dvh-196px)] flex items-center justify-center ${
            app.queue?.length && app.queue?.length > 0 ? "hidden" : ""
          }`}
        >
          No queue, try to search for some songs and add them to the queue
        </div>
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
