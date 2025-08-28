import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { ProQuantitySelectorContext } from "../providers";

export function useProQuantitySelectorContext() {
    return useContextSafe(ProQuantitySelectorContext, "ProQuantitySelectorProvider");
}
