import {
  QueueResponse,
  YoutubeSearchResponse,
  TokenResponse,
  DeviceResponse,
  SpotifyNowPlaying,
  SpotifyPlaylistResponse,
} from "./responseTypes";

/**
 * Edit this file to add new API paths and their response types.
 * Returns a mapping of API paths to their response types and versions.
 */
export function getAPIPathMap() {
  return {
    v1: {
      "get:me/player": {
        response: {} as SpotifyNowPlaying,
      },
      "get:me/player/queue": {
        response: {} as QueueResponse,
      },
      "post:me/player/queue": {
        response: {} as string,
      },
      "get:me/player/devices": {
        response: {} as DeviceResponse,
      },
      "get:me/playlists": {
        response: {} as SpotifyPlaylistResponse,
      },
      "post:api/token": {
        response: {} as TokenResponse,
      },
      "get:youtube/search": {
        response: {} as YoutubeSearchResponse,
      },
    },
  } as const;
}
