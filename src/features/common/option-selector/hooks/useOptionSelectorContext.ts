import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { OptionSelectorContext } from "@/features/common/option-selector/providers";

export function useOptionSelectorContext() {
  return useContextSafe(OptionSelectorContext, "OptionSelectorProvider");
}
