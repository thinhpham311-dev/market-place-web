"use client";
import { useAppSelector } from "@/lib/hooks";
import { selectQuantitySelector } from "@/features/common/quantity-selector/store/selectors";
import { IQuantityInitialState } from "@/features/common/quantity-selector/interfaces";

import { QUANTITY_COUNTER } from "@/features/common/quantity-selector/constants";

interface IGetQuantityValue {
  reducerKey?: string;
  storeKey: string;
  initialState?: IQuantityInitialState;
}

const DEFAULT_INITIAL_STATE = { currentQuantity: 1 };

export function useGetQuantityValue({
  reducerKey = QUANTITY_COUNTER,
  storeKey,
  initialState = DEFAULT_INITIAL_STATE,
}: IGetQuantityValue) {
  const state = useAppSelector(selectQuantitySelector(reducerKey, storeKey));
  return state || initialState;
}
