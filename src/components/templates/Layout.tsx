"use client";

import Sidebar from "@/components/templates/partials/Sidebar";
import Queue from "@/components/templates/partials/Queue";
import Controls from "@/components/templates/partials/Controls";
import Search from "@/components/search/Search";
import { HeroUIProvider } from "@heroui/react";

export default function Layout() {
  return (
    <HeroUIProvider className="h-screen">
      <div className="flex flex-col justify-center bg-zinc-950 rounded-lg h-full p-3 gap-3">
        <Search />
        <div className="flex flex-row gap-3 rounded-lg h-full">
          <div className="hidden flex-grow sm:block md:w-1/2">
            <Sidebar />
          </div>
          <div className="flex-grow sm:w-1/2 lg:w-1/4">
            <Queue />
          </div>
        </div>
        <Controls />
      </div>
    </HeroUIProvider>
  );
}
