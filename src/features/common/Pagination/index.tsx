"use client";

import React from "react";
import PaginationProvider from "./providers";
import PaginationWrapper from "./components/PaginationWrapper";
import PaginationPrevButton from "./components/PaginationPrevButton";
import PaginationNextButton from "./components/PaginationNextButton";
import PaginationDotButtons from "./components/PaginationDotButtons";
import { useHandlePagination } from "@/features/common/pagination/hooks";


interface PaginationCustomProps {
    initialTotal: number;
    initialLimit: number;
    isShowDot?: boolean;
    isShowNav?: boolean;
    className?: string;
    storeKey: string
}

const Pagination: React.FC<PaginationCustomProps> = ({
    storeKey,
    initialTotal,
    initialLimit,
    isShowDot = false,
    isShowNav = false,
}) => {

    const pagination = useHandlePagination({ storeKey, initialTotal, initialLimit });

    return (
        <PaginationProvider contextValues={pagination}>
            <PaginationWrapper>
                {isShowNav && <PaginationPrevButton />}
                {isShowDot && <PaginationDotButtons />}
                {isShowNav && <PaginationNextButton />}
            </PaginationWrapper>
        </PaginationProvider>
    );
};

export default React.memo(Pagination);
