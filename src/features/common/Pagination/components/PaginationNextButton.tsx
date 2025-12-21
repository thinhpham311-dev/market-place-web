"use client";

import React from "react";
import { PaginationItem, PaginationNext } from "@/components/ui/pagination";
import { usePaginationContext } from "@/features/common/pagination/hooks";
import { cn } from "@/utils/styles";

export default function PaginationNextButton() {
    const { currentPage, pages, setPage, hasNext, isShowNav } = usePaginationContext();

    const handleNext = () => {
        if (hasNext) {
            setPage(currentPage + 1);
        }
    };

    if (isShowNav) {
        return (
            <PaginationItem>
                <PaginationNext
                    onClick={handleNext}
                    className={cn(
                        !hasNext || pages.length <= 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                    )}
                />
            </PaginationItem>
        );
    }
}
