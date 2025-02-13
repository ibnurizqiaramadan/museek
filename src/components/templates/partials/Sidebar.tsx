"use client";

import { appStore } from "@/stores/AppStores";
import SearchItems from "@/components/search/SearchItems";
import { useEffect, useRef } from "react";

export default function Sidebar() {
  const { app, setIsSidebarVisible } = appStore((state) => state);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSidebarVisible(entry.isIntersecting);
        console.log("entry.isIntersecting", entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    const currentSidebarRef = sidebarRef.current;

    if (currentSidebarRef) {
      observer.observe(currentSidebarRef);
    }

    return () => {
      if (currentSidebarRef) {
        observer.unobserve(currentSidebarRef);
      }
    };
  }, [setIsSidebarVisible]);

  return (
    <div ref={sidebarRef} className="bg-zinc-900 rounded-lg h-full w-full p-2">
      <div className="overflow-y-auto max-h-[calc(100vh-186px)]">
        {app?.search?.tracks?.items.map((item, index) => (
          <SearchItems key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
