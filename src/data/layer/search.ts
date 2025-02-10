"use server";

import { DataRequest } from "@/data/helper";
import { getAccessToken } from "@/data/layer/auth";
import { getRedisClient } from "@/server/redis";

export const SearchSpotify = async ({ query }: { query: string }) => {
  let accessToken = await (await getRedisClient()).get("accessToken");
  if (!accessToken) {
    const response = await getAccessToken();
    if (response) {
      await (
        await getRedisClient()
      ).set("accessToken", response, {
        EX: 3600,
      });
    }
    accessToken = response ?? null;
  }
  return DataRequest({
    url: "get:search",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    query: {
      q: query,
      type: "track,album,artist,playlist",
      market: "ID",
    },
    useCache: true,
    revalidateTime: 180,
  });
};
