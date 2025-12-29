import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { SkuContext } from "../providers";

export function useSkuContext() {
  return useContextSafe(SkuContext, "SkuProvider");
}
