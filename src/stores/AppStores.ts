import { AppStore } from "@/stores/types";
import { create } from "zustand";

export const appStore = create<AppStore>((set) => ({
  app: {
    socket: undefined,
  },
  setSocket: (socket) => set((state) => ({ app: { ...state.app, socket } })),
}));
