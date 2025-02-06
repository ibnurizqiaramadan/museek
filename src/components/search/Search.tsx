"use client";
import { Input } from "@heroui/react";

export default function Search() {
  return (
    <div className="flex items-center justify-center">
      <Input
        type="text"
        className="rounded-lg w-2/6 p-0 m-0"
        placeholder="Search"
      />
    </div>
  );
}
