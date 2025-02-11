"use server";

import { DataRequest } from "@/data/helper";
import { getAccessToken } from "@/data/layer/auth";

export const getNowPlaying = async () => {
  const accessToken = await getAccessToken();
  return DataRequest({
    url: "v1:get:me/player",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const getQueue = async () => {
  const accessToken = await getAccessToken();
  return DataRequest({
    url: "v1:get:me/player/queue",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    revalidateTime: 180,
  });
};

export const getDevices = async () => {
  const accessToken = await getAccessToken();
  return DataRequest({
    url: "v1:get:me/player/devices",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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
  });
};
