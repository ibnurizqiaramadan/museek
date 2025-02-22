import { YoutubeSearchResponse } from "@/data/responseTypes";
import { QueueItemType } from "@/data/model/queue.model";

export type AppStore = {
  app: {
    search: YoutubeSearchResponse | null;
    searchInput: string;
    queue: QueueItemType[] | null;
    nowPlaying: QueueItemType | null;
    isSidebarVisible: boolean;
    isMusicPlaying: boolean;
    isMusicLoading: boolean;
    contextMenu: {
      id: string | null;
      visible: boolean;
      x: number;
      y: number;
    };
  };
  setSearch: (search: YoutubeSearchResponse | null) => void;
  setSearchInput: (searchInput: string) => void;
  setQueue: (queue: QueueItemType[] | null) => void;
  setNowPlaying: (nowPlaying: QueueItemType | null) => void;
  setIsSidebarVisible: (isSidebarVisible: boolean) => void;
  setIsMusicPlaying: (isMusicPlaying: boolean) => void;
  setIsMusicLoading: (isMusicLoading: boolean) => void;
  setContextMenu: (contextMenu: {
    id: string | null;
    visible: boolean;
    x: number;
    y: number;
  }) => void;
};
