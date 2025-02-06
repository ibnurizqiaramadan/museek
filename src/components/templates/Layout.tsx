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
          <Sidebar />
          <Queue />
        </div>
        <Controls />
      </div>
    </HeroUIProvider>
  );
}
