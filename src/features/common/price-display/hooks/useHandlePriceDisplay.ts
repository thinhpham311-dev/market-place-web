"use client";

import { useLayoutEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
  setPrice,
  setFlashSalePrice,
  setDefaultPrice,
  resetPrice,
} from "@/features/common/price-display/store/stateSlice";
import { IPriceDisplayInitialValue } from "@/features/common/price-display/interfaces";
import { useGetPriceValue } from "@/features/common/price-display/hooks/useGetPriceValue";
import { injectReducer, removeReducer } from "@/store";
import reducer from "@/features/common/price-display/store";
import { PRICE_DISPLAY } from "@/features/common/price-display/constants";

interface IUseHandlePriceDisplay {
  reducerKey?: string;
  storeKey: string;
  initialValue: IPriceDisplayInitialValue;
}

export function useHandlePriceDisplay({
  reducerKey = PRICE_DISPLAY,
  storeKey,
  initialValue,
}: IUseHandlePriceDisplay) {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    injectReducer(reducerKey, reducer);

    return () => {
      removeReducer(reducerKey);
    };
  }, [reducerKey]);

  const state = useGetPriceValue({ reducerKey, storeKey, initialState: initialValue });

  return {
    ...state,
    setPrice: (val: number) => dispatch(setPrice({ storeKey, currentPrice: val })),
    setFlashSalePrice: (val: number) =>
      dispatch(setFlashSalePrice({ storeKey, flashSalePrice: val })),
    setDefaultPrice: (val: number) => dispatch(setDefaultPrice({ storeKey, defaultPrice: val })),
    resetPrice: () => dispatch(resetPrice({ storeKey })),
  };
}
