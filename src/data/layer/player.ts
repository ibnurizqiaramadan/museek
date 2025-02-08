"use server";

import { DataRequest, CustomDataResponse } from "@/data/helper";

export const getQueue = async ({
  accessToken,
  useCache = true,
}: {
  accessToken: string;
  useCache?: boolean;
}): Promise<CustomDataResponse<"get:me/player/queue">> => {
  return DataRequest({
    url: "get:me/player/queue",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    useCache,
    cacheKey: "music-queue",
    revalidateTime: 180,
  });
};

export const getDevices = async ({
  accessToken,
}: {
  accessToken: string;
}): Promise<CustomDataResponse<"get:me/player/devices">> => {
  return DataRequest({
    url: "get:me/player/devices",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    useCache: true,
  });
};

export const addToQueue = async ({
  accessToken,
  uri,
}: {
  accessToken: string;
  uri: string;
}): Promise<CustomDataResponse<"post:me/player/queue">> => {
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
