"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui";
import ProductCard from "../ProductCard";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { cn } from "@/lib/utils";
import { Product } from "@/features/product/types";

interface ProductRowProps {
    data: Product[];
    itemsPerPage?: number;
    className?: string;
    isLoading: boolean;
    error: Error | null;
    countLoadItems: number;
}

const ProductCarousel = ({ data, itemsPerPage = 12, className, isLoading, error, countLoadItems }: ProductRowProps) => {
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
        <Carousel>
            <CarouselContent className="-ml-2">
                {data.slice(0, itemsPerPage).map((product) => (
                    <CarouselItem key={product._id} className={cn("pl-2", className)}>
                        <ProductCard item={product} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="top-1/2 -translate-y-1/2 md:-left-5 -left-3" />
            <CarouselNext className="top-1/2 -translate-y-1/2 md:-right-5 -right-3" />
        </Carousel>
    );
};

export default ProductCarousel;
