import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { DailyDiscoverContext } from "@/features/product/list/daily-discover/providers";

export function useDailyDiscoverContext() {
  return useContextSafe(DailyDiscoverContext, "DailyDiscoverProvider");
}
