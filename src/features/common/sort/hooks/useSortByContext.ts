import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { SortByContext } from "../providers";

export function useSortByContext() {
  return useContextSafe(SortByContext, "SortByProvider");
}
