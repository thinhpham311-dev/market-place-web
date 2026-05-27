"use client";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectFilterSelector } from "@/features/common/filter/store/selectors";
import { IFilterState, createDefault } from "@/features/common/filter/store/initials";
import { FILTER } from "@/features/common/filter/constants";

interface IGetFilterValue {
  reducerKey?: string;
  storeKey: string;
  initialValue?: IFilterState;
}

const DEFAULT_FILTER_VALUE = createDefault();

export const useGetFilterValue = ({
  reducerKey = FILTER,
  storeKey,
  initialValue = DEFAULT_FILTER_VALUE,
}: IGetFilterValue) => {
  const state = useAppSelector(selectFilterSelector(reducerKey, storeKey));

  return useMemo(() => {
    if (!state) {
      return initialValue;
    }

    return state;
  }, [state, initialValue]);
};
