import * as React from "react";

//components
import ProductItem from "./ProductItem";

//types
import { IProduct } from "@/interfaces/product";

//lib
import { cn } from "@/lib/utils"

//datas
import { productData } from "@/constants/data";

//hooks
import { usePagination, usePaginationRender } from "@/lib/hooks";
import { NotFound } from "@/components/ui/organisms";


interface IGridListProps {
    data: Array<IProduct>;
    itemsPerPage?: number; // Tùy chọn số lượng mục trên mỗi trang,
    className?: string
}

const GridListWithPagination = ({ data, itemsPerPage = 12, className }: IGridListProps) => {
    const { currentPage, totalPages, currentData, handlePageChange } = usePagination<IProduct>({
        data,
        itemsPerPage,
    });

    const pagination = usePaginationRender({
        currentPage,
        totalPages,
        handlePageChange,
    });

    return (
        <div>
            <div className={cn("grid w-full", className)}>
                {currentData.map((item, index) => {
                    if (item.quantity > 0) {
                        return <ProductItem key={index} item={item} />;
                    }
                })}
            </div>
            <div className="flex items-center justify-center">{pagination}</div>
        </div>
    );
};

export default function ProductItemsList() {
    return (
        <>
            {productData && productData.length > 0 ?
                <GridListWithPagination
                    data={productData}
                    itemsPerPage={18}
                    className="lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3"
                />
                : <NotFound />
            }
        </>
    )
};