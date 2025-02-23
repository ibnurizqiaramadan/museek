"use server";

import { DataRequest } from "@/data/helper";

export const CreateUser = async () => {
  return DataRequest({
    url: "hasura:post:users",
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: {
      object: {
        first_name: "anonymous",
      },
    },
  });
};

export const GetUser = async (userId: string) => {
  return DataRequest({
    url: `hasura:get:users/:id`,
    params: {
      id: userId,
    },
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
  });
};
