import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { InfiniteScrollContext } from "../providers";

export function useInfiniteScrollContext() {
    return useContextSafe(InfiniteScrollContext, "InfiniteScrollProvider");
}
