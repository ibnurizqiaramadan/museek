"use server";

import { DataRequest } from "@/data/helper";
import { getAccessToken } from "@/data/layer/auth";

export const SearchSpotify = async ({
  query,
  limit,
  offset,
}: {
  query: string;
  limit?: number;
  offset?: number;
}) => {
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
      limit: limit?.toString() || "10",
      offset: offset?.toString() || "0",
    },
    useCache: true,
    revalidateTime: 86400,
    responseTime: (time) => console.log("SearchSpotify", time, "ms"),
  });
};
