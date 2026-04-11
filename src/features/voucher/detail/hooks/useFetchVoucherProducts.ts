"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import reducer from "@/features/voucher/detail/store";
import { injectReducer, removeReducer } from "@/store";
import { getVoucherProducts } from "@/features/voucher/detail/store/dataSlice";
import { selectVoucherProductsByStoreKey } from "@/features/voucher/detail/store/selectors";
import { VOUCHER_DETAIL_PRODUCTS_KEY } from "@/features/voucher/detail/constants";
import {
  mapVoucherProduct,
  resolveVoucherProductList,
} from "@/features/voucher/detail/utils/normalizeVoucherProducts";
import type { UseFetchVoucherProductsParams } from "@/features/voucher/detail/types";

export function useFetchVoucherProducts({
  code = "",
  shopId = "",
  limit = 12,
  page = 1,
}: UseFetchVoucherProductsParams) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    injectReducer(VOUCHER_DETAIL_PRODUCTS_KEY, reducer);

    return () => {
      removeReducer(VOUCHER_DETAIL_PRODUCTS_KEY);
    };
  }, []);

  const { loading, error, data } = useAppSelector(
    selectVoucherProductsByStoreKey(VOUCHER_DETAIL_PRODUCTS_KEY),
  );

  useEffect(() => {
    if (!code) {
      return;
    }

    const promise = dispatch(
      getVoucherProducts({
        code,
        shopId,
        limit,
        page,
      }) as any,
    );

    return () => {
      promise.abort?.();
    };
  }, [code, dispatch, limit, page, shopId]);

  const products = useMemo(
    () =>
      resolveVoucherProductList(data)
        .map(mapVoucherProduct)
        .filter((item) => item.product_id),
    [data],
  );

  return {
    products,
    loading,
    error,
  };
}
