'use client'
import { useState } from "react"

//components
import { Button } from "@/components/ui/atoms"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/molecules';
import ProductItem from "./ProductItem";

//datas
import { productData } from "@/constants/data"


//types
import { IProduct } from "@/interfaces/product";

//libs
import { useUniqueId } from "@/lib/hooks";
import { cn } from "@/lib/utils"


interface IGridListProps {
    data: Array<IProduct>;
    itemsPerPage?: number;
    className?: string
}


const GridListWithLoading = ({ data, itemsPerPage = 12, className }: IGridListProps) => {
    const id = useUniqueId()
    const [visibleItems, setVisibleItems] = useState(itemsPerPage);

    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + itemsPerPage); // Tăng số lượng mục hiển thị
    };

    return (
        <div className={cn("grid w-full", className)}>
            {data?.slice(0, visibleItems).map((item, index) => {
                if (item.quantity > 0) {
                    return (
                        <ProductItem key={`${id}-${index}`} item={item} />
                    )
                }
            })}
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


export default function ProductitemsListByCategoryId() {
    return (
        <Card className="border-0 md:px-6 px-3">
            <CardHeader className=" px-0 space-x-3 mb-3" >
                <CardTitle className=" capitalize text-center mx-auto">Categories</CardTitle>
                <CardDescription className="capitalize text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras auctor sollicitudin nulla ac ultrices.</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <GridListWithLoading data={productData} itemsPerPage={12} className="lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3" />
            </CardContent>
        </Card>
    );
}


