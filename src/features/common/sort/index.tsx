"use client";

import React from "react";
import SortByProvider from "./providers";
import SortByWrapper from "./components/SortByWrapper";
import SortOptionList from "./components/SortByOptionsList";
import { useSortBy } from "@/features/common/sort/hooks";
import { SORT } from "@/features/common/sort/constants";
import { ISortState } from "@/features/common/sort/store/initials";

interface ISortByProps {
  storeKey: string;
  initialValue: ISortState;
}

const SortBy = ({ storeKey, initialValue }: ISortByProps) => {
  const sortBy = useSortBy({ reducerKey: SORT, storeKey, initialValue });

  return (
    <SortByProvider contextValues={sortBy} className="flex flex-row space-x-2">
      <SortByWrapper>
        <SortOptionList />
      </SortByWrapper>
    </SortByProvider>
  );
};

export default SortBy;
