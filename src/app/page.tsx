"use client";

import { useEffect } from "react";
import { DataRequest } from "@/data/helper";
export default function Home() {
  useEffect(() => {
    const fetchQueue = async () => {
      const accessToken = sessionStorage.getItem("accessToken");
      if (!accessToken) {
        const response = await DataRequest({ url: "me/player/queue" });
        console.log(response);
      }
    };
    fetchQueue();
  }, []);

  return (
    <div>
      <h1>Spotify Controller</h1>
      <button
        onClick={() => {
          console.log("test");
        }}
      >
        Test
      </button>
    </div>
  );
}
