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

db.version(2).stores({
  queue: "++id, videoId, title",
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

export const deleteFromQueue = async (id: string) => {
  try {
    await queue.delete(id);
  } catch (error) {
    console.error("Failed to delete item from queue:", error);
  }
};

export const getQueue = async () => {
  try {
    return await queue.toArray();
  } catch (error) {
    console.error("Failed to get queue:", error);
    return [];
  }
};
