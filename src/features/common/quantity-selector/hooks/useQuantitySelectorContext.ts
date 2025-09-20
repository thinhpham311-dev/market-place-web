import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { QuantitySelectorContext } from "../providers";

export function useQuantitySelectorContext() {
    return useContextSafe(QuantitySelectorContext, "QuantitySelectorProvider");
}
