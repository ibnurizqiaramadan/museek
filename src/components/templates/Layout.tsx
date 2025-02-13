"use client";

import Sidebar from "@/components/templates/partials/Sidebar";
import Queue from "@/components/templates/partials/Queue";
import Controls from "@/components/templates/partials/Controls";
import Search from "@/components/search/Search";
import { HeroUIProvider } from "@heroui/react";
import { appStore } from "@/stores/AppStores";

export default function Layout() {
  const { app } = appStore((state) => state);
  return (
    <HeroUIProvider className="h-screen">
      <div className="flex flex-col justify-center bg-zinc-950 rounded-lg h-full p-3 gap-3">
        <Search />
        <div
          className={`flex flex-row ${
            app.isSidebarVisible ? "gap-3" : ""
          } rounded-lg h-full`}
        >
          <div
            className={`flex-grow md:block md:w-1/2 ${
              (app.search?.tracks?.items.length ?? 0 > 0)
                ? "flex w-full"
                : "hidden"
            }`}
          >
            <Sidebar />
          </div>
          <div className="flex-grow w-full sm:w-1/2 md:w-1/2 lg:w-1/4">
            <Queue />
          </div>
        </div>
        <Controls />
      </div>
    </HeroUIProvider>
  );
}
