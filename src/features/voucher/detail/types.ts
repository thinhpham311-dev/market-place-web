import type { ISpuModel } from "@/models/spu";
import type { VoucherItem } from "@/features/voucher/list/types";

export interface UseFetchVoucherProductsParams {
  code?: string;
  shopId?: string;
  limit?: number;
  page?: number;
}

export interface VoucherProductsState {
  loading: boolean;
  error: string | null;
  data: Record<string, any> | null;
}

export type VoucherProductsResponse = Record<string, any>;

export interface VoucherDetailContextType {
  voucher: VoucherItem;
  discountSummary: string;
  isClaimed: boolean;
  onClaim: () => void;
  products: ISpuModel[];
  productsLoading: boolean;
  productsError: string | null;
}
