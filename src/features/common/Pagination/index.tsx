"use client";

import React from "react";
import PaginationProvider from "./providers";
import PaginationWrapper from "./components/PaginationWrapper";
import PaginationPrevButton from "./components/PaginationPrevButton";
import PaginationNextButton from "./components/PaginationNextButton";
import PaginationDotButtons from "./components/PaginationDotButtons";
import PaginationLabel from "./components/PaginationLabel";
import { useHandlePagination } from "@/features/common/pagination/hooks";
import { IPaginationInitialValue } from "@/features/common/pagination/interfaces";

interface IPaginationCustomProps {
  storeKey: string;
  initialValue: IPaginationInitialValue;
  className?: string;
}

const Pagination = ({ storeKey, initialValue }: IPaginationCustomProps) => {
  const pagination = useHandlePagination({ storeKey, initialValue });

  return (
    <PaginationProvider contextValues={{ ...pagination }}>
      <PaginationWrapper>
        <PaginationPrevButton />
        <PaginationDotButtons />
        <PaginationNextButton />
        <PaginationLabel />
      </PaginationWrapper>
    </PaginationProvider>
  );
};

export default React.memo(Pagination);
