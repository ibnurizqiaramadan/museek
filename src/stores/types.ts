import { YoutubeSearchResponse } from "@/data/responseTypes";
import { QueueItemType } from "@/data/model/queue.model";

export type AppStore = {
  app: {
    search: YoutubeSearchResponse | null;
    searchInput: string;
    queue: QueueItemType[] | null;
    nowPlaying: QueueItemType | null;
    isSidebarVisible: boolean;
  };
  setSearch: (search: YoutubeSearchResponse | null) => void;
  setSearchInput: (searchInput: string) => void;
  setQueue: (queue: QueueItemType[] | null) => void;
  setNowPlaying: (nowPlaying: QueueItemType | null) => void;
  setIsSidebarVisible: (isSidebarVisible: boolean) => void;
};
