import { RootState } from "@/store";
import { VOUCHER_DETAIL_PRODUCTS } from "@/features/voucher/detail/constants";

export const selectVoucherProductsByStoreKey =
  (storeKey: string = VOUCHER_DETAIL_PRODUCTS) =>
  (state: RootState) => {
    const data = state[storeKey];

    return {
      loading: data?.loading ?? false,
      error: data?.error ?? null,
      data: data?.data ?? null,
    };
  };
