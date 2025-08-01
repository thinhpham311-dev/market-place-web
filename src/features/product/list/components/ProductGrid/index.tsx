import React from "react";
import ProductCard from "../ProductCard";
import { Product } from "@/features/product/types";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { cn } from "@/lib/utils";

interface ProductGridProps {
    data: Product[];
    className?: string;
    status: "idle" | "loading" | "success" | "empty" | "error";
    error?: Error | null;
    countLoadItems?: number;
}

const ProductGrid = ({
    data,
    className,
    status = "loading",
    error,
    countLoadItems = 12,
}: ProductGridProps) => {
    switch (status) {
        case "loading":
            return <Loading className={className} count={countLoadItems} />;

        case "error":
            return <NotFound message={error?.message || "Something went wrong."} />;

        case "empty":
            return <NotFound message="No products found." />;

        case "success":
            return (
                <div className={cn("grid w-full", className)}>
                    {data.map((item) => (
                        <ProductCard key={item._id} item={item} isLoading={false} />
                    ))}
                </div>
            );

        case "idle":
        default:
            return null;
    }
};

export default ProductGrid;
