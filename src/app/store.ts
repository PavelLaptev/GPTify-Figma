import { create } from "zustand";

interface ViewStoreProps {
  view: viewsType;
  setView: (view: viewsType) => void;
}

export const useViewStore = create<ViewStoreProps>((set) => ({
  view: "loading",
  setView: (view: viewsType) => set({ view }),
}));

interface ApiKeysStoreProps {
  apiKey: string | undefined;
  setApiKey: (apiKey: string) => void;
}

export const useApiKeysStore = create<ApiKeysStoreProps>((set) => ({
  apiKey: undefined,
  setApiKey: (apiKey: string) => set({ apiKey }),
}));

interface ErrorStoreProps {
  error: string | undefined;
  setError: (error: string) => void;
}

export const useErrorStore = create<ErrorStoreProps>((set) => ({
  error: undefined as string | undefined,
  setError: (error: string) => set({ error }),
}));
