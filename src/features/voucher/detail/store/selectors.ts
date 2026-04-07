import { RootState } from "@/store";
import { VOUCHER_DETAIL_PRODUCTS_KEY } from "@/features/voucher/detail/constants";

export const selectVoucherProductsByStoreKey =
  (storeKey: string = VOUCHER_DETAIL_PRODUCTS_KEY) =>
  (state: RootState) => {
    const data = state[storeKey];

    return {
      loading: data?.loading ?? false,
      error: data?.error ?? null,
      data: data?.data ?? null,
    };
  };
