"use client";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectSortBySelector } from "@/features/common/sort/store/selectors";
import { ISortState, createDefault } from "@/features/common/sort/store/initials";
import { SORT } from "@/features/common/sort/constants";

interface IGetPriceValue {
  reducerKey?: string;
  storeKey: string;
  initialValue?: ISortState;
}

export const useGetSortByValue = ({
  reducerKey = SORT,
  storeKey,
  initialValue = createDefault(),
}: IGetPriceValue) => {
  const state = useAppSelector(selectSortBySelector(reducerKey, storeKey));

  return useMemo(() => {
    if (!state) {
      return initialValue;
    }

    return state;
  }, [state, initialValue]);
};
