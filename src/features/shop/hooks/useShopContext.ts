import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { ShopInfoContext } from "../providers";

export function useShopInfoContext() {
    return useContextSafe(ShopInfoContext, "ShopInfoProvider");
}
