"use client";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectPaginationSeletor } from "@/features/common/pagination/store/selectors";
import { IPaginationState, createDefault } from "@/features/common/pagination/store/initials";
import { PAGINATION } from "@/features/common/pagination/constants";

interface IGetPriceValue {
  reducerKey?: string;
  storeKey: string;
  initialValue?: IPaginationState;
}

export const useGetPaginationValue = ({
  reducerKey = PAGINATION,
  storeKey,
  initialValue = createDefault(),
}: IGetPriceValue) => {
  const state = useAppSelector(selectPaginationSeletor(reducerKey, storeKey));

  return useMemo(() => {
    if (!state) {
      return initialValue;
    }

    return state;
  }, [state, initialValue]);
};
