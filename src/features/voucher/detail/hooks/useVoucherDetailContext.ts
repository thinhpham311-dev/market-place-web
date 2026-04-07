import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { VoucherDetailContext } from "@/features/voucher/detail/providers";

export function useVoucherDetailContext() {
  return useContextSafe(VoucherDetailContext, "VoucherDetailProvider");
}
