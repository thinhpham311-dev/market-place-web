import * as React from "react";

//components
import { GridListItem } from "./item";
import { Button } from "@/components/ui/atoms";

//types
import { IProduct } from "@/types/product";

//icons
import { ChevronLeft, ChevronRight } from "lucide-react"

interface IGridListProps {
    data: Array<IProduct>;
    itemsPerPage?: number; // Tùy chọn số lượng mục trên mỗi trang
}

export const GridListWithPagination = ({ data, itemsPerPage = 12 }: IGridListProps) => {
    const [currentPage, setCurrentPage] = React.useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const currentData = React.useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [currentPage, itemsPerPage, data]);

    return (
        <div>
            <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3 w-full">
                {currentData.map((item, index) => (
                    <GridListItem key={index} item={item} />
                ))}
            </div>

            <div className="flex justify-center items-center mt-6 space-x-2">
                <Button
                    variant="outline"
                    className="text-xs"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft />
                </Button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                        key={index}
                        variant={currentPage === index + 1 ? "default" : "outline"}
                        className="text-xs"
                        size="icon"
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Button>
                ))}

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
        </div>
    );
};
