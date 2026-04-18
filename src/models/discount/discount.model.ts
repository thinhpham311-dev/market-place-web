export type VoucherStatus = "available" | "used" | "expired";

export interface IVoucherModel {
  discountId: string;
  id: string;
  title: string;
  description: string;
  code: string;
  minSpend: number;
  discountAmount: number;
  discountType: "amount" | "percentage";
  discountValue: number;
  maxDiscountAmount: number;
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  usageCount: number;
  shopId: string;
  status: VoucherStatus;
  orderId?: string;
};

export interface UseVoucherFetchDataParams {
  shopId?: string;
  limit?: number;
  page?: number;
}

export interface VoucherSummary {
  available: number;
  used: number;
  expired: number;
}
