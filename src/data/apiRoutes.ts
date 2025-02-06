import { QueueResponse } from "./responseTypes";

/**
 * Edit this file to add new API paths and their response types.
 * Returns a mapping of API paths to their response types and versions.
 */
export function getAPIPathMap() {
  return {
    "me/player/queue": {
      response: {} as QueueResponse,
      version: "v1",
      method: "GET",
    },
  } as const;
}
