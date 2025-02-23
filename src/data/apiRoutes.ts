import {
  YoutubeSearchResponse,
  UserResponse,
  CreateUserResponse,
  GetQueueByUserResponse,
  CreateQueueResponse,
  CreateQueueItemResponse,
  GetVideoByIdResponse,
} from "./responseTypes";

/**
 * Edit this file to add new API paths and their response types.
 * Returns a mapping of API paths to their response types and versions.
 */
export function getAPIPathMap() {
  return {
    hasura: {
      "post:users": {
        response: {} as CreateUserResponse,
      },
      "get:users/:id": {
        response: {} as UserResponse,
      },
      "get:queue/user/:user_id": {
        response: {} as GetQueueByUserResponse,
      },
      "post:queue": {
        response: {} as CreateQueueResponse,
      },
      "post:queue/items": {
        response: {} as CreateQueueItemResponse,
      },
      "get:queue/items/:id": {
        response: {} as GetVideoByIdResponse,
      },
    },
    internal: {
      "get:youtube/search": {
        response: {} as YoutubeSearchResponse,
      },
    },
  } as const;
}
