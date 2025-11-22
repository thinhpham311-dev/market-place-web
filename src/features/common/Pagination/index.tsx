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
    reducerKey: string
    storeKey: string
    initialTotal: number;
    initialLimit: number;
    isShowDot?: boolean;
    isShowNav?: boolean;
    isShowLabel?: boolean;
    className?: string;
}

const Pagination = ({
    reducerKey,
    storeKey,
    initialTotal,
    initialLimit,
    ...rest
}: IPaginationCustomProps) => {

    const pagination = useHandlePagination({ reducerKey, storeKey, initialTotal, initialLimit });

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
