"use client";

import { useEffect, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import reducer from "@/features/voucher/list/store";
import { injectReducer, removeReducer } from "@/store";
import { getDiscountList } from "@/features/voucher/list/store/dataSlice";
import { selectVoucherListByStoreKey } from "@/features/voucher/list/store/selectors";
import { DEFAULT_VOUCHER_SHOP_ID, VOUCHER_LIST_KEY } from "@/features/voucher/list/constants";
import {
  mapVoucherItem,
  resolveVoucherList,
} from "@/features/voucher/list/utils/normalizeVoucher";
import type { UseVoucherFetchDataParams } from "@/features/voucher/list/types";

export type { VoucherItem, VoucherStatus, UseVoucherFetchDataParams } from "@/features/voucher/list/types";

export function useFetchData(params: UseVoucherFetchDataParams = {}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    injectReducer(VOUCHER_LIST_KEY, reducer);

    return () => {
      removeReducer(VOUCHER_LIST_KEY);
    };
  }, []);

  const { loading, error, data } = useAppSelector(selectVoucherListByStoreKey(VOUCHER_LIST_KEY));

  const shopId = params.shopId || DEFAULT_VOUCHER_SHOP_ID;
  const limit = params.limit ?? 50;
  const page = params.page ?? 1;

  useEffect(() => {
    const promise = dispatch(
      getDiscountList({
        shopId,
        limit,
        page,
      }) as any,
    );

    return () => {
      promise.abort?.();
    };
  }, [dispatch, limit, page, shopId]);

  const vouchers = useMemo(() => resolveVoucherList(data).map(mapVoucherItem), [data]);

  return {
    vouchers,
    loading,
    error,
    shopId,
  };
}
