import React from "react";
import ProductCard from "../ProductCard";
import { Product } from "@/features/product/types";
import Loading from "./Loading"
import NotFound from "./NotFound";
import { cn } from "@/lib/utils";

interface ProductGridProps {
    data: Product[];
    className?: string;
    isLoading?: boolean;
    error: Error | null;
    countLoadItems: number;
}

const ProductGrid = ({ data, className, isLoading = false, error, countLoadItems }: ProductGridProps) => {
    const hasNoData = !data || data.length === 0;

    if (isLoading && hasNoData) {
        return <Loading className={className} count={countLoadItems} />;
    }

    if (!isLoading && hasNoData && error) {
        return <NotFound message={error.message || "Something went wrong."} />;
    }

    if (!isLoading && hasNoData) {
        return <NotFound />;
    }
    return (
        <div className={cn("grid w-full", className)}>
            {data.map((_) => (
                <ProductCard
                    isLoading={isLoading}
                    key={_._id}
                    item={_}
                />
            ))}
        </div>
    );
};

export default ProductGrid;
