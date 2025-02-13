import {
  SearchResponse,
  QueueResponse,
  DeviceResponse,
  SpotifyNowPlaying,
} from "@/data/responseTypes";

export type AppStore = {
  app: {
    search: SearchResponse | null;
    queue: QueueResponse | null;
    refreshQueue: boolean;
    devices: DeviceResponse | null;
    selectedDevice: string | null;
    nowPlaying: SpotifyNowPlaying | null;
    isSidebarVisible: boolean;
  };
  setSearch: (search: SearchResponse | null) => void;
  setQueue: (queue: QueueResponse | null) => void;
  setNowPlaying: (nowPlaying: SpotifyNowPlaying | null) => void;
  setSearchResults: (searchResults: SearchResponse | null) => void;
  setRefreshQueue: (refreshQueue: boolean) => void;
  setDevices: (devices: DeviceResponse | null) => void;
  setSelectedDevice: (selectedDevice: string | null) => void;
  setIsSidebarVisible: (isSidebarVisible: boolean) => void;
};
