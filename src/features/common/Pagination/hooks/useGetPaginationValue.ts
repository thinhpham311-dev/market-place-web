"use client";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectPaginationSeletor } from "@/features/common/pagination/store/selectors";
import { createDefault } from "@/features/common/pagination/store/initials";
import { IPaginationInitialState } from "@/features/common/pagination/interfaces";

import { PAGINATION } from "@/features/common/pagination/constants";

interface IGetPriceValue {
  reducerKey?: string;
  storeKey: string;
  initialValue?: IPaginationInitialState;
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
