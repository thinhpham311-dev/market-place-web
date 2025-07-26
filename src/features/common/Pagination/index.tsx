"use client";

import React from "react";
import PaginationProvider from "./providers";
import PaginationWrapper from "./components/PaginationWrapper";
import PaginationPrevButton from "./components/PaginationPrevButton";
import PaginationNextButton from "./components/PaginationNextButton";
import PaginationDotButtons from "./components/PaginationDotButtons";

interface PaginationCustomProps {
    total: number;
    limit?: number;
    isShowDot?: boolean;
    isShowNav?: boolean;
    className?: string;
    storeKey?: string
}

const Pagination: React.FC<PaginationCustomProps> = ({
    total,
    limit = 12,
    isShowDot = true,
    isShowNav = true,
    ...rest
}) => {
    return (
        <PaginationProvider total={total} limit={limit} {...rest}>
            <PaginationWrapper>
                {isShowNav && <PaginationPrevButton />}
                {isShowDot && <PaginationDotButtons />}
                {isShowNav && <PaginationNextButton />}
            </PaginationWrapper>
        </PaginationProvider>
    );
};

export default React.memo(Pagination);
