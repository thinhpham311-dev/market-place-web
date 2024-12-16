import * as React from "react";

//components
import { GridListItem } from "./item";
import { Button } from "@/components/ui/atoms";
import { cn } from "@/lib/utils"

//types
import { IProduct } from "@/types/product";

interface IGridListProps {
    data: Array<IProduct>;
    itemsPerPage?: number;
    className?: string
}

export const GridListWithLoading = ({ data, itemsPerPage = 12, className }: IGridListProps) => {
    const [visibleItems, setVisibleItems] = React.useState(itemsPerPage);

    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + itemsPerPage); // Tăng số lượng mục hiển thị
    };

    return (
        <div className={cn("grid w-full", className)}>
            {data?.slice(0, visibleItems).map((item, index) => (
                <GridListItem key={index} item={item} />
            ))}
            {visibleItems < data.length && ( // Hiển thị nút nếu còn dữ liệu
                <div className="lg:col-span-6 md:col-span-3 col-span-2 my-10">
                    <Button
                        variant="outline"
                        className="block mx-auto text-xs"
                        onClick={handleLoadMore}
                    >
                        See More...
                    </Button>
                </div>
            )}
        </div>
    );
};
