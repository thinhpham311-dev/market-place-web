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
import { injectReducer } from "@/store";
import reducer from "./store";

injectReducer("pagination", reducer)

const PaginationCustom = () => {
    const dispatch = useAppDispatch();
    const { currentPage, totalPages } = useAppSelector(
        (state) => state.pagination
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
        <div className="flex items-center space-x-3">
            <Pagination>
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
        </div>
    );
};

export default PaginationCustom;
