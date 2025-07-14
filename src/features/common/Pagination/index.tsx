'use client';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
} from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setPage } from "./store/stateSlice";

const PaginationWrapper = () => {
    const dispatch = useAppDispatch();
    const { currentPage, totalPages } = useAppSelector(
        (state) => state.suggestionPagination
    );

    const getPages = () => {
        const pages: number[] = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    };

    const handleClick = (page: number) => {
        if (page < 1 || page > totalPages) return;
        dispatch(setPage(page));
    };

    return (
        <Pagination className="mt-8">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={() => handleClick(currentPage - 1)} />
                </PaginationItem>

                {getPages().map((page) => (
                    <PaginationItem key={page}>
                        <PaginationLink
                            href="#"
                            isActive={page === currentPage}
                            onClick={(e) => {
                                e.preventDefault();
                                handleClick(page);
                            }}
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <PaginationNext onClick={() => handleClick(currentPage + 1)} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationWrapper;
