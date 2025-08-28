import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { ProSkuDardBoardContext } from "../providers";

export function useSkuDataContext() {
    return useContextSafe(ProSkuDardBoardContext, "ProSkuDardBoardProvider");
}
