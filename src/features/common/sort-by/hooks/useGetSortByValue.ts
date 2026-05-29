"use client";
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

const DEFAULT_SORTBY_VALUE = createDefault();

export const useGetSortByValue = ({
  reducerKey = SORTBY,
  storeKey,
  initialState = DEFAULT_SORTBY_VALUE,
}: IGetPriceValue) => {
  const state = useAppSelector(selectSortBySelector(reducerKey, storeKey));

  return state || initialState;
};
