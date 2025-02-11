"use server";

import { DataRequest } from "@/data/helper";
import { getAccessToken } from "@/data/layer/auth";

export const SearchSpotify = async ({ query }: { query: string }) => {
  const accessToken = await getAccessToken();
  return DataRequest({
    url: "v1:get:search",
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
    responseTime: (time) => console.log("SearchSpotify", time, "ms"),
  });
};
