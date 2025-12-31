"use client";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectPriceDisplaySelector } from "@/features/common/price-display/store/selectors";
import { createDefault } from "@/features/common/price-display/store/initials";
import { IPriceDisplayInitialState } from "@/features/common/price-display/interfaces";
import { PRICE_DISPLAY } from "@/features/common/price-display/constants";

interface IGetPriceValue {
  reducerKey?: string;
  storeKey: string;
  initialState?: IPriceDisplayInitialState;
}

export const useGetPriceValue = ({
  reducerKey = PRICE_DISPLAY,
  storeKey,
  initialState = createDefault(),
}: IGetPriceValue) => {
  const state = useAppSelector(selectPriceDisplaySelector(reducerKey, storeKey));

  return useMemo(() => {
    if (!state) {
      return initialState;
    }

    return state;
  }, [state, initialState]);
};
