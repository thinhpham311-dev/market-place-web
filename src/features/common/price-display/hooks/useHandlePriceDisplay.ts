"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
  initPrice,
  setPrice,
  setFlashSalePrice,
  setDefaultPrice,
  resetPrice,
} from "@/features/common/price-display/store/stateSlice";
import { IPriceDisplayInitialValue } from "@/features/common/price-display/interfaces";
import { useGetPriceValue } from "@/features/common/price-display/hooks/useGetPriceValue";
import { withEnsureInit } from "@/features/common/price-display/helpers";
interface IUseHandlePriceDisplay {
  storeKey: string;
  initialValue: IPriceDisplayInitialValue;
}

export function useHandlePriceDisplay({ storeKey, initialValue }: IUseHandlePriceDisplay) {
  const dispatch = useAppDispatch();
  const {
    defaultPrice,
    defaultFlashSalePrice,
    defaultCurrentPrice,
    defaultMaxPrice,
    defaultMinPrice,
  } = initialValue;

  useEffect(() => {
    dispatch(
      initPrice({
        key: storeKey,
        initialValue: {
          flashSalePrice: defaultFlashSalePrice,
          currentPrice: defaultCurrentPrice,
          maxPrice: defaultMaxPrice,
          minPrice: defaultMinPrice,
          defaultPrice,
        },
      }),
    );
    return () => {
      dispatch(resetPrice({ key: storeKey }));
    };
  }, [dispatch, storeKey, defaultPrice, defaultFlashSalePrice]);

  const state = useGetPriceValue({ storeKey });

  return {
    ...state,
    setPrice: (val: number) =>
      dispatch(withEnsureInit(setPrice({ storeKey, currentPrice: val }), [storeKey])),
    setFlashSalePrice: (val: number) =>
      dispatch(withEnsureInit(setFlashSalePrice({ storeKey, flashSalePrice: val }), [storeKey])),
    setDefaultPrice: (val: number) =>
      dispatch(withEnsureInit(setDefaultPrice({ storeKey, defaultPrice: val }), [storeKey])),
    resetPrice: () => dispatch(withEnsureInit(resetPrice({ storeKey }), [storeKey])),
  };
}
