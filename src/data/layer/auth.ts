"use server";

import { post } from "@/data/helper";
import { CustomDataResponse } from "@/data/helper";

export const getAccessToken = async (): Promise<
  CustomDataResponse<"api/token">
> => {
  return post({
    url: "api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64")}`,
    },
    body: {
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
      client_id: process.env.SPOTIFY_CLIENT_ID,
    },
  });
};
