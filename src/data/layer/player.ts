"use server";

import { DataRequest, CustomDataResponse } from "@/data/helper";

export const getQueue = async ({
  accessToken,
}: {
  accessToken: string;
}): Promise<CustomDataResponse<"get:me/player/queue">> => {
  return DataRequest({
    url: "get:me/player/queue",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
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
  });
};
