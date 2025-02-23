"use client";

import Sidebar from "@/components/templates/partials/Sidebar";
import Queue from "@/components/templates/partials/Queue";
import Controls from "@/components/templates/partials/Controls";
import Search from "@/components/search/Search";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import { appStore } from "@/stores/AppStores";
import { useEffect } from "react";
import ContextMenu from "@/components/ContextMenu/ContextMenu";
import { GetQueueByUserResponse } from "@/data/responseTypes";
import { decodeJWT } from "@/server/jwt";

export default function Layout(props: {
  queue: GetQueueByUserResponse["queue"][0]["queue_items_aggregate"]["nodes"];
  accessToken: string;
}) {
  const {
    app,
    setIsSidebarVisible,
    setContextMenu,
    setIsMusicPlaying,
    setQueue,
    setQueueId,
  } = appStore((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      setQueue(props.queue);
      const decoded = await decodeJWT(props.accessToken);
      setQueueId(decoded?.payload?.queueId ?? null);
    };

    fetchData();
  }, [props.queue, props.accessToken, setQueue, setQueueId]);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarVisible(!(window.innerWidth <= 768));
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsSidebarVisible]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key);

      // if (e.key === " ") {
      //   e.preventDefault();
      //   e.stopPropagation();
      //   setIsMusicPlaying(!app.isMusicPlaying);
      // }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [app.isMusicPlaying, setIsMusicPlaying]);

  return (
    <HeroUIProvider className="h-dvh select-none">
      <ToastProvider placement="top-right" />
      <div
        className="flex flex-col justify-center bg-zinc-950 rounded-lg h-full p-3 gap-y-3"
        onClick={(e) => {
          setContextMenu({ id: null, visible: false, x: 0, y: 0 });
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <ContextMenu />
        <div
          className={`absolute top-0 left-0 w-full h-full ${
            app.contextMenu.visible ? "block" : "hidden"
          }`}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setContextMenu({
              id: null,
              visible: false,
              x: 0,
              y: 0,
            });
          }}
        ></div>
        <Search />
        <div
          className={`flex flex-row gap-3 ${
            app.isSidebarVisible ? "" : ""
          } rounded-lg h-full`}
        >
          <div
            className={`flex-grow md:block md:w-1/2 ${
              (app.search?.data.items.length ?? 0) > 0
                ? "flex w-full"
                : "hidden"
            }`}
          >
            <Sidebar />
          </div>
          <div
            className={`flex-grow w-full sm:w-1/2 md:w-1/2 lg:w-1/4 ${
              app.isSidebarVisible === false &&
              (app.search?.data.items.length ?? 0) > 0
                ? "hidden"
                : ""
            }`}
          >
            <Queue />
          </div>
        </div>
        <Controls />
      </div>
    </HeroUIProvider>
  );
}
