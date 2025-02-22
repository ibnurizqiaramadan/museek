"use server";

import { DataRequest } from "@/data/helper";

export const SearchYoutube = async ({ query }: { query: string }) => {
  return DataRequest({
    url: "v1:get:youtube/search",
    query: {
      q: `${query.trim().replace(/\s+/g, " ")}, official music`,
    },
    useCache: true,
    cacheKey: `youtube-search-${query}`,
    revalidateTime: 60 * 60 * 24, // 24 hours
  });
};
