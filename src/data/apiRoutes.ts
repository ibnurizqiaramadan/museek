import { QueueResponse, SearchResponse, TokenResponse } from "./responseTypes";

/**
 * Edit this file to add new API paths and their response types.
 * Returns a mapping of API paths to their response types and versions.
 */
export function getAPIPathMap() {
  return {
    "get:me/player/queue": {
      response: {} as QueueResponse,
      version: "v1",
    },
    "post:me/player/queue": {
      response: {} as QueueResponse,
      version: "v1",
    },
    "post:api/token": {
      response: {} as TokenResponse,
      version: "v1",
    },
    "get:search": {
      response: {} as SearchResponse,
      version: "v1",
    },
  } as const;
}
