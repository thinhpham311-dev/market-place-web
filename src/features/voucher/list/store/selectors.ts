import { RootState } from "@/store";
import { VOUCHER_LIST_KEY } from "@/features/voucher/list/constants";

export const selectVoucherListByStoreKey = (storeKey: string = VOUCHER_LIST_KEY) => (state: RootState) => {
  const data = state[storeKey];

  return {
    loading: data?.loading ?? false,
    error: data?.error ?? null,
    data: data?.data ?? null,
  };
};
