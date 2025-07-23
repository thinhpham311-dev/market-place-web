"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardTitle,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui";
import { NotFound } from "@/components/layout";
import LoadingPlaceholder from "./LoadingSkeleton";
import { ICategory } from "@/features/category/types";
import CategoryButton from "./CategoryButton";
import { cn } from "@/lib/utils";

interface ICategoryButtonsProps {
    data: ICategory[];
    ids: string[];
    className?: string;
    isLoading?: boolean;
}

const CategoryButtons: React.FC<ICategoryButtonsProps> = ({
    data,
    ids,
    className = "",
    isLoading = false,
}) => {
    const lastId = ids.at(-1);

    if (isLoading) return <LoadingPlaceholder />;
    if (!isLoading && data.length === 0) return <NotFound />;

    const current = data.find((cat) => cat._id === lastId && cat.isLeaf);
    if (current && current.parent_id) {
        return <Card className="border-none shadow-none">
            <CardContent className="p-0">
                <CardTitle className="text-md underline cursor-pointer">
                    {current.category_name}
                </CardTitle>
            </CardContent>
        </Card>;
    }

    return (
        <Carousel className="mx-10">
            <CarouselContent className="-ml-2">
                {data
                    .filter(
                        (category) =>
                            !category.isLeaf || category.parent_id === null
                    )
                    .map((category) => (
                        <CarouselItem
                            key={category._id}
                            className={cn(
                                "pl-2 flex justify-center",
                                className
                            )}
                        >
                            <CategoryButton
                                category={category}
                                isActive={category._id === lastId}
                                lastId={lastId}
                            />
                        </CarouselItem>
                    ))}
            </CarouselContent>
            <CarouselPrevious className="top-1/2 -translate-y-1/2 -left-10" />
            <CarouselNext className="top-1/2 -translate-y-1/2 -right-10" />
        </Carousel>
    );
}
export default React.memo(CategoryButtons);
