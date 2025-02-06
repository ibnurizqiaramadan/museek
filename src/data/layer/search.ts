import { DataRequest, CustomDataResponse } from "@/data/helper";

export const SearchSpotify = async ({
  accessToken,
  query,
}: {
  accessToken: string;
  query: string;
}): Promise<CustomDataResponse<"get:search">> => {
  return DataRequest({
    url: "get:search",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    query: {
      q: query,
      type: "track",
      market: "ID",
    },
  });
};
