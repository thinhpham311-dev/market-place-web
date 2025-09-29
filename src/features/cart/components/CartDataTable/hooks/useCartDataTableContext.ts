import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { CartDataTableContext } from "../providers";

export function useCartDataTableContext() {
    return useContextSafe(CartDataTableContext, "CartDataTableProvider");
}
