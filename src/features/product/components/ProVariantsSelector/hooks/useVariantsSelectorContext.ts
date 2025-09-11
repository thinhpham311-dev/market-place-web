import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { VariantsSelectorContext } from "../providers";

export function useVariantsSelectorContext() {
    return useContextSafe(VariantsSelectorContext, "VariantsSelectorProvider");
}
