import { useOutletContext } from "react-router-dom";

export interface MainLayoutContext {
  selectedWorkerId: string;
  setSelectedWorkerId: (id: string) => void;
}

export function useMainLayoutContext() {
  return useOutletContext<MainLayoutContext>();
}
