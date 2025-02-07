import {
  Track,
  SearchResponse,
  QueueResponse,
  DeviceResponse,
} from "@/data/responseTypes";

export type AppStore = {
  app: {
    search: SearchResponse | null;
    queue: QueueResponse | null;
    refreshQueue: boolean;
    devices: DeviceResponse | null;
    selectedDevice: string | null;
  };
  setSearch: (search: SearchResponse | null) => void;
  setQueue: (queue: QueueResponse | null) => void;
  setCurrentlyPlaying: (currentlyPlaying: Track | null) => void;
  setSearchResults: (searchResults: SearchResponse | null) => void;
  setRefreshQueue: (refreshQueue: boolean) => void;
  setDevices: (devices: DeviceResponse | null) => void;
  setSelectedDevice: (selectedDevice: string | null) => void;
};
