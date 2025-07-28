"use client";

import React from "react";
import PaginationProvider from "./providers";
import PaginationWrapper from "./components/PaginationWrapper";
import PaginationPrevButton from "./components/PaginationPrevButton";
import PaginationNextButton from "./components/PaginationNextButton";
import PaginationDotButtons from "./components/PaginationDotButtons";
import { useHandlePagination } from "@/features/common/pagination/hooks";


interface PaginationCustomProps {
    total: number;
    limit: number;
    isShowDot?: boolean;
    isShowNav?: boolean;
    className?: string;
    storeKey: string
}

const Pagination: React.FC<PaginationCustomProps> = ({
    storeKey,
    total,
    limit,
    isShowDot = false,
    isShowNav = false,
}) => {
    const pagination = useHandlePagination({ storeKey, totalItems: total, limit });

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
