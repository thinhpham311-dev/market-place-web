import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui";
import { NotFound } from "@/components/layout";
import LoadingPlaceholder from "./LoadingSkeleton";
import CategoryCard from "./CategoryCard";
import { cn } from "@/lib/utils";
import { ICategory } from "@/interfaces/category";

interface ProductRowProps {
    data: ICategory[];
    itemsPerPage?: number;
    className?: string;
    isLoading: boolean;
}

const CategoryCarousel = ({ data, itemsPerPage = 12, className, isLoading }: ProductRowProps) => {
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
                            <CategoryCard item={item} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className=" top-1/2 -translate-y-1/2 md:-left-5 -left-3 " />
                <CarouselNext className=" top-1/2 -translate-y-1/2 md:-right-5 -right-3" />
            </Carousel>
        </>
    );
};

export default CategoryCarousel;
