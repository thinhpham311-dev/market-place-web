import React from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "@/interfaces/product";
import { cn } from "@/lib/utils";
import LoadingPlaceholder from "./LoadingSkeleton";
import { NotFound } from "@/components/layout";

interface ProductGridProps {
    data: IProduct[];
    className?: string;
    isLoading?: boolean;
}

const ProductGrid = ({ data, className, isLoading = false }: ProductGridProps) => {
    if (isLoading && (!data || data.length === 0)) {
        return <LoadingPlaceholder />;
    }

    if (!isLoading && (!data || data.length === 0)) {
        return <NotFound />;
    }

    return (
        <div className={cn("grid w-full", className)}>
            {data.map((item) => (
                <ProductCard key={item._id} item={item} />
            ))}
        </div>
    );
};

export default ProductGrid;
