import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { ShoppingCartContext } from "../providers";

export function useShoppingCartContext() {
    return useContextSafe(ShoppingCartContext, "ShoppingCartProvider");
}
