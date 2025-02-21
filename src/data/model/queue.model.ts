import Dexie from "dexie";
import { YoutubeSearchResponse } from "../responseTypes";

const db = new Dexie("music-guys");

export interface QueueItemType {
  id: string;
  videoId: string;
  title: string;
  duration_raw: string;
  views: number;
  snippet: YoutubeSearchResponse["data"]["items"][0]["snippet"];
}

db.version(1).stores({
  queue: "++id, videoId, title, duration_raw, views, snippet",
});

export const queue = db.table<QueueItemType>("queue");

// Function to add an item to the queue with error handling
export const addToQueue = async (item: QueueItemType) => {
  try {
    await queue.add(item);
  } catch (error) {
    console.error("Failed to add item to queue:", error);
  }
};

export const getQueue = async () => {
  return await queue.toArray();
};
