import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { FilterContext } from "../providers";

export function useFilterContext() {
    return useContextSafe(FilterContext, "FilterProvider");
}
