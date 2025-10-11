import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { ShoppingCartContext } from "@/features/cart/providers";

export function useShoppingCartContext() {
    return useContextSafe(ShoppingCartContext, "ShoppingCartProvider");
}
