"use client";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// // Actions and selectors
import { selectShopInfoByStoreKey } from "../store/selectors";
import { getShopById } from "../store/dataSlice";

// Reducer & constants
import reducer from "@/features/shop/store";
import { injectReducer, removeReducer } from "@/store";
import { IShopModel } from "@/models/shop";

// constants
import { SHOP_KEY } from "@/features/shop/constants";

interface IUseFetchDataParams {
  shop_id?: string;
  storeKey?: string;
  enabled?: boolean;
}

export function useFetchData({ shop_id = "", storeKey, enabled = true }: IUseFetchDataParams) {
  const resolvedStoreKey = useMemo(() => {
    if (storeKey) {
      return storeKey;
    }

    return shop_id ? `SHOP_INFO_${shop_id}` : "SHOP_INFO_FALLBACK";
  }, [shop_id, storeKey]);

  useEffect(() => {
    if (!enabled || !resolvedStoreKey) {
      return;
    }

    const reducerKey = `${SHOP_KEY}_${resolvedStoreKey}`;
    injectReducer(reducerKey, reducer);
    return () => {
      removeReducer(reducerKey);
    };
  }, [enabled, resolvedStoreKey]);

  const dispatch = useAppDispatch();
  const {
    shopInfo,
    loading = false,
    error = null,
    status = "",
  } = useAppSelector(selectShopInfoByStoreKey(resolvedStoreKey));

  useEffect(() => {
    if (!enabled || !shop_id) {
      return;
    }

    const promise = dispatch(
      getShopById({
        shop_id,
      } as IShopModel) as any,
    );

    return () => {
      promise.abort?.();
    };
  }, [dispatch, enabled, shop_id]);

  const shopHref = useMemo(() => {
    if (!shopInfo?.shop_id) {
      return undefined;
    }

    return `/shop/${shopInfo.shop_slug || "shop"}-s.${shopInfo.shop_id}`;
  }, [shopInfo]);

  return {
    shopInfo,
    shopHref,
    loading,
    error,
    status,
  };
}
