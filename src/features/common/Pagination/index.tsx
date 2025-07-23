"use client";

import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { usePagination } from "./hooks/usePagination";
import { injectReducer } from "@/store";
import reducer from "./store";

injectReducer("pagination", reducer)

interface PaginationCustomProps {
    totalItems: number;
    showNumbers?: boolean;      // ✅ Hiển thị số trang hay không
    showNavigation?: boolean;   // ✅ Hiển thị Previous/Next hay không
}

const PaginationCustom = ({
    totalItems,
    showNumbers = false,
    showNavigation = false,
}: PaginationCustomProps) => {
    const {
        currentPage,
        pages,
        setPage,
        hasPrev,
        hasNext,
    } = usePagination(totalItems);

    if (pages.length <= 1 && !showNavigation) return null; // Không hiển thị nếu chỉ có 1 trang

    return (
        <div className="flex items-center space-x-3">
            <Pagination>
                <PaginationContent>
                    {/* ✅ Previous */}
                    {showNavigation && (
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => setPage(currentPage - 1)}
                                className={cn(
                                    !hasPrev
                                        ? "pointer-events-none opacity-50"
                                        : "cursor-pointer"
                                )}
                            />
                        </PaginationItem>
                    )}

                    {/* ✅ Page Numbers */}
                    {showNumbers &&
                        pages.map((page, index) => {
                            if (page === "...") {
                                return (
                                    <PaginationItem key={`dots-${index}`}>
                                        <span className="px-3 py-2">...</span>
                                    </PaginationItem>
                                );
                            }

                            return (
                                <PaginationItem key={page as number}>
                                    <PaginationLink
                                        href="#"
                                        isActive={page === currentPage}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPage(page as number);
                                        }}
                                    >
                                        {(page as number) + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                    {/* ✅ Next */}
                    {showNavigation && (
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => setPage(currentPage + 1)}
                                className={cn(
                                    !hasNext
                                        ? "pointer-events-none opacity-50"
                                        : "cursor-pointer"
                                )}
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default PaginationCustom;
