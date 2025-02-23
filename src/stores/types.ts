import { YoutubeSearchResponse, QueueItemDbTypes } from "@/data/responseTypes";

export type AppStore = {
  app: {
    search: YoutubeSearchResponse | null;
    searchInput: string;
    queue: QueueItemDbTypes[] | null;
    queueId: string | null;
    nowPlaying: QueueItemDbTypes | null;
    isSidebarVisible: boolean;
    isMusicPlaying: boolean;
    isMusicLoading: boolean;
    isSearchFocused: boolean;
    contextMenu: {
      id: string | null;
      visible: boolean;
      x: number;
      y: number;
    };
  };
  setSearch: (search: YoutubeSearchResponse | null) => void;
  setSearchInput: (searchInput: string) => void;
  setQueue: (queue: QueueItemDbTypes[] | null) => void;
  setQueueId: (queueId: string | null) => void;
  setNowPlaying: (nowPlaying: QueueItemDbTypes | null) => void;
  setIsSidebarVisible: (isSidebarVisible: boolean) => void;
  setIsMusicPlaying: (isMusicPlaying: boolean) => void;
  setIsMusicLoading: (isMusicLoading: boolean) => void;
  setIsSearchFocused: (isSearchFocused: boolean) => void;
  setContextMenu: (contextMenu: {
    id: string | null;
    visible: boolean;
    x: number;
    y: number;
  }) => void;
};
