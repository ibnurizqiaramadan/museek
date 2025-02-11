import { AppStore } from "@/stores/types";
import { create } from "zustand";

export const appStore = create<AppStore>((set) => ({
  app: {
    search: null,
    queue: null,
    refreshQueue: false,
    devices: null,
    selectedDevice: null,
    nowPlaying: null,
  },
  setSearch: (search) => set((state) => ({ app: { ...state.app, search } })),
  setQueue: (queue) => set((state) => ({ app: { ...state.app, queue } })),
  setNowPlaying: (nowPlaying) =>
    set((state) => ({ app: { ...state.app, nowPlaying } })),
  setSearchResults: (searchResults) =>
    set((state) => ({ app: { ...state.app, searchResults } })),
  setRefreshQueue: (refreshQueue) =>
    set((state) => ({ app: { ...state.app, refreshQueue } })),
  setDevices: (devices) => set((state) => ({ app: { ...state.app, devices } })),
  setSelectedDevice: (selectedDevice) =>
    set((state) => ({ app: { ...state.app, selectedDevice } })),
}));
