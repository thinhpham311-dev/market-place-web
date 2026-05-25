import type { IVoucherModel, VoucherStatus, VoucherSummary } from "@/models/discount";

export type { VoucherStatus, VoucherSummary };

export type VoucherItem = IVoucherModel;

export interface VoucherListContextType {
  vouchers: VoucherItem[];
  loading: boolean;
  error: string | null;
  shopId?: string;
  summary: VoucherSummary;
  claimedVoucherIds: string[];
  handleClaimVoucher: (voucherId: string) => void;
}
