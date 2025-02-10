"use server";

import { post } from "@/data/helper";
import { CustomDataResponse } from "@/data/helper";
import { getRedisClient } from "@/server/redis";

const generateAccessToken = async (): Promise<
  CustomDataResponse<"v1:post:api/token">
> => {
  const [response, error]: CustomDataResponse<"v1:post:api/token"> = await post(
    {
      url: "v1:post:api/token",
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
      useCache: false,
    },
  );

  if (response) {
    await (
      await getRedisClient()
    ).set("accessToken", response.access_token, {
      EX: 3600,
    });
  }

  return [response, error];
};

export const getAccessToken = async (): Promise<string | null> => {
  let accessToken = await (await getRedisClient()).get("accessToken");
  if (!accessToken) {
    const [response, error] = await generateAccessToken();
    if (error) console.log("error", error);
    accessToken = response?.access_token ?? null;
  }
  return accessToken;
};
