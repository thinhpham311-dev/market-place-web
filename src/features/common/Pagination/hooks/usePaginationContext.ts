import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { PaginationContext } from "../providers";

export function usePaginationContext() {
  return useContextSafe(PaginationContext, "PaginationProvider");
}
