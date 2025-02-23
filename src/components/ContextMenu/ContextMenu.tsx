"use client";

import { appStore } from "@/stores/AppStores";
import { deleteFromQueue } from "@/data/model/queue.model";
import { useEffect, useState } from "react";
import { addToast } from "@heroui/toast";

export default function ContextMenu() {
  const { app, setQueue, setContextMenu } = appStore((state) => state);

  // State to hold window dimensions
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Update dimensions on mount
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Optional: Update dimensions on resize
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate adjusted positions
  const adjustedX = Math.min(app.contextMenu.x, windowDimensions.width - 200); // Assuming 200 is the width of the menu
  const adjustedY = Math.min(app.contextMenu.y, windowDimensions.height - 100); // Assuming 100 is the height of the menu

  return (
    <>
      <div
        className={`absolute z-20 bg-zinc-950 rounded-lg py-1 shadow-lg ${
          app.contextMenu.visible ? "block" : "hidden"
        }`}
        style={{
          left: adjustedX,
          top: adjustedY,
        }}
      >
        <div className="flex flex-col gap-y-1 cursor-pointer p-1">
          <div
            className="flex flex-row hover:bg-zinc-800 rounded-lg px-2 py-1"
            onClick={async () => {
              await deleteFromQueue(app.contextMenu?.id as string);
              setQueue(
                app.queue?.filter((item) => item.id !== app.contextMenu.id) ||
                  null,
              );
              addToast({
                title: "Deleted from queue",
                description: app.queue?.find(
                  (item) => item.id === app.contextMenu.id,
                )?.title,
                variant: "solid",
                color: "success",
              });
              setContextMenu({
                id: null,
                visible: false,
                x: 0,
                y: 0,
              });
            }}
          >
            <p>Delete</p>
          </div>
          <div
            className="flex flex-row hover:bg-zinc-800 rounded-lg px-2 py-1"
            onClick={() => {
              const videoId = app.queue?.find(
                (item) => item.id === app.contextMenu.id,
              )?.id;
              if (!videoId) return;
              window.open(
                `${window.location.origin}/api/v1/youtube/download/${videoId}?filename=${
                  app.queue?.find((item) => item.id === app.contextMenu.id)
                    ?.title
                }.mp3`,
                "_blank",
              );
            }}
          >
            <p>Download</p>
          </div>
          <div
            className="flex flex-row hover:bg-zinc-800 rounded-lg px-2 py-1"
            onClick={() => {
              const videoId = app.queue?.find(
                (item) => item.id === app.contextMenu.id,
              )?.id;
              if (!videoId) return;
              window.open(
                `https://www.youtube.com/watch?v=${videoId}`,
                "_blank",
              );
            }}
          >
            <p>Open on YouTube</p>
          </div>
        </div>
      </div>
    </>
  );
}
