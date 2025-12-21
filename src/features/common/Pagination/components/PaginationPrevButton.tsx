"use client";

import React from "react";
import { PaginationItem, PaginationPrevious } from "@/components/ui/pagination";
import { usePaginationContext } from "@/features/common/pagination/hooks";
import { cn } from "@/utils/styles";

export default function PaginationPrevButton() {
    const { currentPage, setPage, hasPrev, pages, isShowNav } = usePaginationContext();


    const handlePrev = () => {
        if (hasPrev) {
            setPage(currentPage - 1);
        }
    };

    if (isShowNav) {
        return (
            <PaginationItem>
                <PaginationPrevious
                    onClick={handlePrev}
                    className={cn(
                        !hasPrev || pages.length <= 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                    )}
                />
            </PaginationItem>
        );
    }
}
