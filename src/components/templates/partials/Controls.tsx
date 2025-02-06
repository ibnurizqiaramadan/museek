"use client";

import { Button } from "@heroui/react";

export default function Controls() {
  return (
    <div className="flex flex-col justify-center items-center bg-zinc-900 rounded-lg max-h-[80px] w-full min-h-[80px]">
      <div className="flex flex-row gap-3">
        <Button>Previous</Button>
        <Button>Play</Button>
        <Button>Next</Button>
      </div>
    </div>
  );
}
