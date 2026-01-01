"use client";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectSortBySelector } from "@/features/common/sort-by/store/selectors";
import { createDefault } from "@/features/common/sort-by/store/initials";
import { ISortInitialState } from "@/features/common/sort-by/interfaces";
import { SORTBY } from "@/features/common/sort-by/constants";

interface IGetPriceValue {
  reducerKey?: string;
  storeKey: string;
  initialState?: ISortInitialState;
}

export const useGetSortByValue = ({
  reducerKey = SORTBY,
  storeKey,
  initialState = createDefault(),
}: IGetPriceValue) => {
  const state = useAppSelector(selectSortBySelector(reducerKey, storeKey));

  return useMemo(() => {
    if (!state) {
      return initialState;
    }

    return state;
  }, [state, initialState]);
};
