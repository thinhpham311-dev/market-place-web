"use client";

import React from "react";
import SortByProvider from "./providers";
import SortByWrapper from "./components/SortByWrapper";
import SortOptionList from "./components/SortByOptionsList";
import { useSortBy } from "@/features/common/sort-by/hooks";
import { ISortInitialValue } from "@/features/common/sort-by/interfaces";

interface ISortByProps {
  storeKey: string;
  initialValue: ISortInitialValue;
}

const SortBy = ({ storeKey, initialValue }: ISortByProps) => {
  const sortBy = useSortBy({ storeKey, initialValue });

  return (
    <SortByProvider contextValues={{ ...sortBy }} className="flex flex-row space-x-2">
      <SortByWrapper>
        <SortOptionList />
      </SortByWrapper>
    </SortByProvider>
  );
};

export default SortBy;
