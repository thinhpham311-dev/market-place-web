import { IVoucherModel } from "@/models/discount";

export interface IVoucherProductsRequest {
  code?: string;
  shopId?: string;
  limit?: number;
  page?: number;
}

export interface IVoucherProductsState {
  loading: boolean;
  error: string | null;
  total: number;
  data: Record<string, any> | null;
  status: string;
}

export interface IVoucherProductsResponse {
  metadata: {
    list: Record<string, any>;
    total: number;
  };
}

export interface VoucherDetailContextType {
  voucher: IVoucherModel;
  discountSummary: string;
  isClaimed: boolean;
  onClaim: () => void;
}
