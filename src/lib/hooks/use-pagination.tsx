import { useState, useMemo, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/atoms";


interface IUsePaginationProps<T> {
    data: Array<T>;
    itemsPerPage?: number;
}

export const usePagination = <T,>({ data, itemsPerPage = 12 }: IUsePaginationProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data.length, itemsPerPage]);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const currentData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [currentPage, itemsPerPage, data]);

    return {
        currentPage,
        totalPages,
        currentData,
        handlePageChange,
    };
};


interface IUsePaginationRenderProps {
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
}


export const usePaginationRender = ({
    currentPage,
    totalPages,
    handlePageChange,
}: IUsePaginationRenderProps): ReactNode => {
    return (
        <div className="flex justify-center items-center mt-6 space-x-2" >
            <Button
                variant="outline"
                className="text-xs"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <ChevronLeft />
            </Button>

            {
                totalPages ?
                    Array.from({ length: totalPages }, (_, index) => (
                        <Button
                            key={index}
                            variant={currentPage === index + 1 ? "default" : "outline"}
                            className="text-xs"
                            size="icon"
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Button>
                    )) : <Button variant="outline" size="icon">...</Button>
            }

            <Button
                variant="outline"
                className="text-xs"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <ChevronRight />
            </Button>
        </div>
    );
};