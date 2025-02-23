"use server";

import { DataRequest } from "../helper";
import { QueueItemTypes } from "../responseTypes";

export const CreateQueue = async (userId: string) => {
  return DataRequest({
    url: "hasura:post:queue",
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: {
      object: {
        user_id: userId,
      },
    },
  });
};

export const GetQueueByUser = async (userId: string) => {
  return DataRequest({
    url: "hasura:get:queue/user/:user_id",
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    params: {
      user_id: userId,
    },
  });
};

export const AddQueueItem = async (
  queueItem: QueueItemTypes,
  queueId: string,
) => {
  return DataRequest({
    url: "hasura:post:queue/items",
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    body: {
      object: {
        id: undefined,
        video_id: queueItem.id.videoId,
        queue_id: queueId,
        snippet: JSON.stringify(queueItem.snippet),
        duration_raw: queueItem.duration_raw,
        title: queueItem.title,
      },
    },
  });
};

export const GetVideoById = async (videoId: string) => {
  return DataRequest({
    url: "hasura:get:queue/items/:id",
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    params: {
      id: videoId,
    },
  });
};

export const DeleteQueueItem = async (videoId: string) => {
  return DataRequest({
    url: "hasura:delete:queue/items/:id",
    headers: {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
    },
    params: {
      id: videoId,
    },
  });
};
