import * as React from "react";

//components
import ProductItem from "./ProductItem";
import { NotFound } from "@/components/layout";

//types
import { Product } from "@/features/product/types";

//lib
import { cn } from "@/lib/utils"

//datas
import { productData } from "@/constants/data";

//hooks


interface IGridListProps {
    data: Array<Product>;
    itemsPerPage?: number; // Tùy chọn số lượng mục trên mỗi trang,
    className?: string
}

const GridListWithPagination = ({ data, className }: IGridListProps) => {


    return (
        <div>
            <div className={cn("grid w-full", className)}>
                {data.map((item, index) => {
                    if (item.quantity > 0) {
                        return <ProductItem key={index} item={item} />;
                    }
                })}
            </div>
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