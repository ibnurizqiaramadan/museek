import { AppStore } from "@/stores/types";
import { create } from "zustand";

export const appStore = create<AppStore>((set) => ({
  app: {
    search: null,
    searchInput: "",
    queue: null,
    nowPlaying: null,
    isSidebarVisible: false,
    contextMenu: {
      id: null,
      visible: false,
      x: 0,
      y: 0,
    },
  },
  setSearch: (search) => set((state) => ({ app: { ...state.app, search } })),
  setSearchInput: (searchInput) =>
    set((state) => ({ app: { ...state.app, searchInput } })),
  setQueue: (queue) => set((state) => ({ app: { ...state.app, queue } })),
  setNowPlaying: (nowPlaying) =>
    set((state) => ({ app: { ...state.app, nowPlaying } })),
  setIsSidebarVisible: (isSidebarVisible) =>
    set((state) => ({ app: { ...state.app, isSidebarVisible } })),
  setContextMenu: (contextMenu) =>
    set((state) => ({ app: { ...state.app, contextMenu } })),
}));
