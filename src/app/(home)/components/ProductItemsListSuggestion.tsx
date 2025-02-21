'use client'
//components
import { useState } from "react";
import { Button } from "@/components/ui/atoms";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/molecules';
import ProductItem from "./ProductItem";

//datas
// import { productData } from "@/constants/data"
import { IProduct } from "@/types/product";

//libs
import { cn } from "@/lib/utils"
import { NotFound } from "@/components/ui/organisms";



interface IGridListProps {
    data?: IProduct[];
    itemsPerPage?: number;
    className?: string;
    totalData?: number
}


const GridListWithLoading = ({ data, itemsPerPage = 12, className, totalData = 0 }: IGridListProps) => {
    const [visibleItems, setVisibleItems] = useState(itemsPerPage);

    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + itemsPerPage); // Tăng số lượng mục hiển thị
    };

    return (
        <div className={cn("grid w-full", className)}>
            {data?.slice(0, visibleItems).map((item) => {
                // if (item.quantity > 0) {
                return (
                    <ProductItem key={item._id} item={item} />
                )
                // }
            })}
            {visibleItems < totalData && ( // Hiển thị nút nếu còn dữ liệu
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


export default function ProductItemsListSuggestion({ data, totalData }: IGridListProps) {

    return (
        <Card className="border-0 shadow-none md:px-6 px-3">
            <CardHeader className="items-center px-0 space-x-3 mb-3" >
                <CardTitle className="mb-3 capitalize text-center mx-auto">Suggestion today</CardTitle>
                <CardDescription className="mb-3 capitalize text-center mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis sem sit amet leo rhoncus, non luctus magna tempus. </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                {data && data.length > 0 ? <GridListWithLoading totalData={totalData} data={data} itemsPerPage={12} className="lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3" /> : <NotFound />}
            </CardContent>
        </Card >
    );
}


