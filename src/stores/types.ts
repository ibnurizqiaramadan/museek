import { Track, SearchResponse, QueueResponse } from "@/data/responseTypes";

export type AppStore = {
  app: {
    search: SearchResponse | null;
    queue: QueueResponse | null;
  };
  setSearch: (search: SearchResponse | null) => void;
  setQueue: (queue: QueueResponse | null) => void;
  setCurrentlyPlaying: (currentlyPlaying: Track | null) => void;
  setSearchResults: (searchResults: SearchResponse | null) => void;
};
