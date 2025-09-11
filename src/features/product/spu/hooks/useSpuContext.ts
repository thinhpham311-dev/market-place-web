import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { SpuContext } from "../providers";

export function useSpuContext() {
    return useContextSafe(SpuContext, "SpuProvider");
}
