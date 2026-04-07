import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { VoucherListContext } from "@/features/voucher/list/providers";

export function useVoucherListContext() {
  return useContextSafe(VoucherListContext, "VoucherListProvider");
}
