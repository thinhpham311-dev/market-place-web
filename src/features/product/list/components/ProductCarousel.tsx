import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui";
import { NotFound } from "@/components/layout";
import LoadingPlaceholder from "./LoadingSkeleton";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";
import { IProduct } from "@/interfaces/product";

interface ProductRowProps {
    data: IProduct[];
    itemsPerPage?: number;
    className?: string;
    isLoading: boolean;
}

const ProductCarousel = ({ data, itemsPerPage = 12, className, isLoading }: ProductRowProps) => {
    if (isLoading && (!data || data.length === 0)) {
        return <LoadingPlaceholder />;
    }

    if (!isLoading && (!data || data.length === 0)) {
        return <NotFound />;
    }
    return (
        <>
            <Carousel>
                <CarouselContent className="-ml-2">
                    {data.slice(0, itemsPerPage).map((item) => (
                        <CarouselItem key={item._id} className={cn("pl-2", className)}>
                            <ProductCard item={item} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className=" top-1/2 -translate-y-1/2 md:-left-5 -left-3 " />
                <CarouselNext className=" top-1/2 -translate-y-1/2 md:-right-5 -right-3" />
            </Carousel>
        </>
    );
};

export default ProductCarousel;
