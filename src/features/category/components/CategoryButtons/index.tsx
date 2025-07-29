"use client";

import React, { useMemo } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui";
import NotFound from "./NotFound";
import Loading from "./Loading";
import { Category } from "@/features/category/types";
import CategoryButton from "../CategoryButton";
import { cn } from "@/lib/utils";

interface ButtonsProps {
    data: Category[];
    error: Error | null;
    ids: string[];
    className?: string;
    isLoading?: boolean;
}

const CategoryButtons: React.FC<ButtonsProps> = ({
    data = [],
    ids,
    error,
    className = "",
    isLoading = false,
}) => {
    const lastId = ids.at(-1);

    // Show error first if exists
    if (!isLoading && (!data || data.length === 0) && error) {
        return <NotFound message={error.message || "Something went wrong."} />;
    }

    // Show loading while waiting for data
    if (isLoading && (!data || data.length === 0)) {
        return <Loading count={6} className="h-10" />;
    }

    // Show not found if no data after loading
    if (!isLoading && (!data || data.length === 0)) {
        return <NotFound message="No categories found." />;
    }

    const current = data?.find((cat) => cat.category_id === lastId && cat.isLeaf);
    if (current && current.parent_id) {
        return (
            <CategoryButton
                isLoading={isLoading}
                category={current}
                isActive={current.category_id === lastId}
                lastId={lastId}
            />
        );
    }

    const filteredData = useMemo(
        () =>
            data.filter(
                (category) => !category.isLeaf || category.parent_id === null
            ),
        [data]
    );


    return (
        <Carousel className="mx-10">
            <CarouselContent className="-ml-2">
                {filteredData.map((category: any, index: number) => (
                    <CarouselItem
                        key={category?.category_id || index}
                        className={cn("pl-2 flex justify-center", className)}
                    >
                        <CategoryButton
                            isLoading={isLoading}
                            category={category}
                            isActive={category?.category_id === lastId}
                            lastId={lastId}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>

            {!!filteredData.length && !isLoading && (
                <>
                    <CarouselPrevious className="top-1/2 -translate-y-1/2 -left-10" />
                    <CarouselNext className="top-1/2 -translate-y-1/2 -right-10" />
                </>
            )}
        </Carousel>
    );
};

export default React.memo(CategoryButtons);
