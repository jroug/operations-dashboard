/** Provides typed access to state owned by the persistent main layout. */
import { useOutletContext } from "react-router-dom";

export interface MainLayoutContext {
  selectedWorkerId: string;
  setSelectedWorkerId: (id: string) => void;
}

export function useMainLayoutContext() {
  // Centralizing the cast keeps route components aligned with the Outlet contract.
  return useOutletContext<MainLayoutContext>();
}
