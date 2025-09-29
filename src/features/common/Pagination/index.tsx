"use client";

import React from "react";
import PaginationProvider from "./providers";
import PaginationWrapper from "./components/PaginationWrapper";
import PaginationPrevButton from "./components/PaginationPrevButton";
import PaginationNextButton from "./components/PaginationNextButton";
import PaginationDotButtons from "./components/PaginationDotButtons";
import PaginationLabel from "./components/PaginationLabel"
import { useHandlePagination } from "@/features/common/pagination/hooks";


interface IPaginationCustomProps {
    initialTotal: number;
    initialLimit: number;
    isShowDot?: boolean;
    isShowNav?: boolean;
    isShowLabel?: boolean;
    className?: string;
    storeKey: string
}

const Pagination = ({
    storeKey,
    initialTotal,
    initialLimit,
    ...rest
}: IPaginationCustomProps) => {

    const pagination = useHandlePagination({ storeKey, initialTotal, initialLimit });

    return (
        <PaginationProvider contextValues={{ ...pagination, ...rest }}>
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
