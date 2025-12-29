"use client";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectQuantitySelector } from "@/features/common/quantity-selector/store/selectors";
import { IQuantityInitialState } from "@/features/common/quantity-selector/interfaces";

import { createDefault } from "@/features/common/quantity-selector/store/initials";
import { QUANTITY_COUNTER } from "@/features/common/quantity-selector/constants";

interface IGetQuantityValue {
  reducerKey?: string;
  storeKey: string;
  initialState?: IQuantityInitialState;
}

export function useGetQuantityValue({
  reducerKey = QUANTITY_COUNTER,
  storeKey,
  initialState = createDefault(),
}: IGetQuantityValue) {
  const state = useAppSelector(selectQuantitySelector(reducerKey, storeKey));
  return useMemo(() => {
    if (!state) {
      return initialState;
    }

    return state;
  }, [state, initialState]);
}
