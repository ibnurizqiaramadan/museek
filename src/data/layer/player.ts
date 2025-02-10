"use server";

import { DataRequest } from "@/data/helper";
import { getRedisClient } from "@/server/redis";
import { getAccessToken } from "@/data/layer/auth";

// Helper function to get access token
async function getSpotifyAccessToken(): Promise<string | null> {
  let accessToken = await (await getRedisClient()).get("accessToken");
  if (!accessToken) {
    const [response, error] = await getAccessToken();
    if (error) console.log("error", error);
    accessToken = response?.access_token ?? null;
  }
  return accessToken;
}

export const getQueue = async ({ useCache = true }: { useCache?: boolean }) => {
  const accessToken = await getSpotifyAccessToken();
  return DataRequest({
    url: "get:me/player/queue",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    useCache,
    cacheKey: "music-queue",
    revalidateTime: 180,
    cacheFn: (data) => {
      console.log(data);
    },
  });
};

export const getDevices = async () => {
  const accessToken = await getSpotifyAccessToken();
  return DataRequest({
    url: "get:me/player/devices",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    useCache: true,
  });
};

export const addToQueue = async ({ uri }: { uri: string }) => {
  const accessToken = await getSpotifyAccessToken();
  return DataRequest({
    url: "post:me/player/queue",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    query: {
      uri,
    },
    revalidateKey: "music-queue",
  });
};
