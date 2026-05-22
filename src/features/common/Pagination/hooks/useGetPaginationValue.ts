"use client";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectPaginationByKey } from "@/features/common/pagination/store/selectors";
import { createDefault } from "@/features/common/pagination/store/initials";
import { IPaginationInitialState } from "@/features/common/pagination/interfaces";

import { PAGINATION } from "@/features/common/pagination/constants";

interface IGetPriceValue {
  reducerKey?: string;
  storeKey: string;
  initialValue?: IPaginationInitialState;
}

const DEFAULT_PAGINATION_VALUE = createDefault();

export const useGetPaginationValue = ({
  reducerKey = PAGINATION,
  storeKey,
  initialValue = DEFAULT_PAGINATION_VALUE,
}: IGetPriceValue) => {
  const state = useAppSelector(selectPaginationByKey(reducerKey, storeKey));

  return useMemo(() => {
    if (!state) {
      return initialValue;
    }

    return state;
  }, [state, initialValue]);
};
