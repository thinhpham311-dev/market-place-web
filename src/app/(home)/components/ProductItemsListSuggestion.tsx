'use client';

import { useState, useEffect } from "react";

// components
import { Button } from "@/components/ui/atoms";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/molecules';
import ProductItem from "./ProductItem";

// UI
import { NotFound } from "@/components/ui/organisms";

// types
import { IProduct } from "@/interfaces/product";

// hooks & redux
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "@/store/product/dataSlice";

// utils
import { cn } from "@/lib/utils";
import { injectReducer } from "@/store";
import reducer from "@/store/product";

injectReducer("product", reducer)

interface IGridListProps {
    data: IProduct[];
    itemsPerPage: number;
    className?: string;
    totalData: number;
    isLoading: boolean;
}

const GridListWithLoading = ({ data, itemsPerPage, className, totalData, isLoading }: IGridListProps) => {
    const [visibleItems, setVisibleItems] = useState(itemsPerPage);
    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + itemsPerPage);
    };

    if (isLoading) return <LoadingPlaceholder />;

    if (!data || data.length === 0) return <NotFound />;

    return (
        <div className={cn("grid w-full", className)}>
            {data.slice(0, visibleItems).map((item) =>
                <ProductItem key={item._id} item={item} />
            )}
            {visibleItems < totalData && (
                <div className="lg:col-span-6 md:col-span-3 col-span-2 my-10">
                    <Button variant="outline" className="block mx-auto text-xs" onClick={handleLoadMore}>
                        See More...
                    </Button>
                </div>
            )}
        </div>
    );
};

const LoadingPlaceholder = () => (

    <CardContent className="px-0">
        <div className="text-center">Loading...</div>
    </CardContent>

);

export default function ProductItemsListSuggestion() {
    const dispatch = useAppDispatch();
    const { list: products = [], loading } = useAppSelector((state) => state.product.data);

    useEffect(() => {
        dispatch(getProductList({ limit: 12, sort: "createdAt", page: 1 }) as any);
    }, [dispatch]);


    return (
        <Card className="border-0 shadow-none md:px-6 px-3">
            <CardHeader className="items-center px-0 space-x-3 mb-3">
                <CardTitle className="mb-3 capitalize text-center mx-auto">Suggestion today</CardTitle>
                <CardDescription className="mb-3 capitalize text-center mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc facilisis sem sit amet leo rhoncus, non luctus magna tempus.
                </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <GridListWithLoading
                    data={products}
                    totalData={products.length}
                    itemsPerPage={12}
                    className="lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3"
                    isLoading={loading}
                />
            </CardContent>
        </Card>
    );
}
