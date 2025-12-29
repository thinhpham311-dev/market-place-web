import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { PriceDisplaySelectorContext } from "@/features/common/price-display/providers";

export function usePriceDisplayContext() {
  return useContextSafe(PriceDisplaySelectorContext, "PriceDisplayProvider");
}
