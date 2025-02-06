import { AppStore } from "@/stores/types";
import { create } from "zustand";

export const appStore = create<AppStore>((set) => ({
  app: {
    search: null,
    queue: null,
    currentlyPlaying: null,
  },
  setSearch: (search) => set((state) => ({ app: { ...state.app, search } })),
  setQueue: (queue) => set((state) => ({ app: { ...state.app, queue } })),
  setCurrentlyPlaying: (currentlyPlaying) =>
    set((state) => ({ app: { ...state.app, currentlyPlaying } })),
  setSearchResults: (searchResults) =>
    set((state) => ({ app: { ...state.app, searchResults } })),
}));
