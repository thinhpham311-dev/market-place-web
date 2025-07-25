"use client";

import React from "react";
import { PaginationItem, PaginationLink, Button } from "@/components/ui";
import { usePaginationContext } from "@/features/common/pagination/hooks";

export default function PaginationDotButtons() {
    const { currentPage, pages, setPage } = usePaginationContext();

    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            setPage(page);
        }
    };

    if (pages.length <= 1) return null;


    return (
        <>
            {pages.map((page, index) => {
                if (page === "...") {
                    return (
                        <PaginationItem key={`dots-${index}-${currentPage}`}>
                            <span className="px-3 py-2">...</span>
                        </PaginationItem>
                    );
                }

                return (
                    <PaginationItem key={`page-${page}`}>
                        <PaginationLink isActive={page === currentPage}>
                            <Button
                                size="icon"
                                variant="link"
                                onClick={() => handlePageChange(page as number)}
                            >
                                {(page as number) + 1}
                            </Button>
                        </PaginationLink>
                    </PaginationItem>
                );
            })}
        </>
    );
}
