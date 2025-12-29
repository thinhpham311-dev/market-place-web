"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectOptionsSelector } from "@/features/common/option-selector/store/selectors";
import { createDefault } from "@/features/common/option-selector/store/initials";
import { IOptionInitialState } from "@/features/common/option-selector/interfaces";
import { OPTION_SELECTOR } from "@/features/common/option-selector/constants";

interface IGetOptionSelectorValue {
  reducerKey?: string;
  storeKey: string;
  initialValue?: IOptionInitialState;
}

export const useGetOptionSelectorValue = ({
  reducerKey = OPTION_SELECTOR,
  storeKey,
  initialValue = createDefault(),
}: IGetOptionSelectorValue) => {
  const state = useAppSelector(selectOptionsSelector(reducerKey, storeKey));

  return useMemo(() => {
    const selected = state?.selectedOptions ?? initialValue.selectedOptions;

    return {
      ...(state ?? initialValue),
      selectedOptions: selected.filter((v: number) => v !== null),
    };
  }, [state]);
};
