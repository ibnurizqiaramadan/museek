"use server";

import { DataRequest } from "@/data/helper";
import { getAccessToken } from "@/data/layer/auth";

export const getNowPlaying = async () => {
  const accessToken = await getAccessToken();
  return DataRequest({
    url: "v1:get:me/player",
    headers: { Authorization: `Bearer ${accessToken}` },
    responseTime: (time) => console.log("getNowPlaying", time, "ms"),
  });
};

export const getQueue = async () => {
  const accessToken = await getAccessToken();
  return DataRequest({
    url: "v1:get:me/player/queue",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    responseTime: (time) => console.log("getQueue", time, "ms"),
    useCache: false,
    cacheKey: "music-queue",
    revalidateTime: 180,
  });
};

export const getPlaylists = async () => {
  const accessToken = await getAccessToken();
  return DataRequest({
    url: "v1:get:me/playlists",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      limit: "100",
    },
    responseTime: (time) => console.log("getPlaylists", time, "ms"),
  });
};

export const getDevices = async () => {
  const accessToken = await getAccessToken();
  return DataRequest({
    url: "v1:get:me/player/devices",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    responseTime: (time) => console.log("getDevices", time, "ms"),
  });
};

export const addToQueue = async ({ uri }: { uri: string }) => {
  const accessToken = await getAccessToken();
  return DataRequest({
    url: "v1:post:me/player/queue",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    query: {
      uri,
    },
    revalidateKey: "music-queue",
  });
};
