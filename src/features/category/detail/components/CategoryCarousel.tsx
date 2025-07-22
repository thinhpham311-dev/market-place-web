"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
    Button,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui";
import { ICategory } from "@/features/category/types";
import { NotFound } from "@/components/layout";
import LoadingPlaceholder from "./LoadingSkeleton";
import { cn } from "@/lib/utils";

interface CategoryButtonsProps {
    data: ICategory[];
    ids: string[];
    className?: string;
    isLoading?: boolean;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
    data,
    ids,
    className = "",
    isLoading = false,
}) => {
    const router = useRouter();
    const lastId = ids.at(-1);
    if (isLoading) return <LoadingPlaceholder />;
    if (!isLoading && data.length === 0) return <NotFound />;

    const getButtonClass = (active: boolean) =>
        cn("p-0 text-md", active ? "font-bold underline text-primary" : "text-muted-foreground");

    const handleNavigate = React.useCallback((slug: string, catId: string, ancestors?: string[]) => {
        const ancestorsPath = ancestors && ancestors.length > 0 ? `${ancestors.join(".")}.` : "";
        const path = `/categories/${slug}-cat.${ancestorsPath}${catId}`;

        if (catId !== lastId) {
            router.push(path);
            if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    }, [lastId])


    const renderedIds = new Set<string>(); // Set toàn cục hoặc trong component

    const renderCategories = (categories: ICategory[], level = 0) => {
        return categories
            .filter((category) => {
                if (renderedIds.has(category._id)) return false;
                renderedIds.add(category._id);

                if (category?.isLeaf && category.parent_id !== null) return false;

                return true;
            })
            .map((category) => (
                <React.Fragment key={category._id}>
                    <CarouselItem
                        className={cn("pl-2 flex justify-center", className)}
                    >
                        <Button
                            className={cn(
                                "w-full line-clamp-1",
                                getButtonClass(category._id === lastId)
                            )}
                            variant="outline"
                            onClick={() =>
                                handleNavigate(
                                    category.category_slug,
                                    category._id,
                                    category.ancestors
                                )
                            }
                        >
                            {category.category_name}
                        </Button>
                    </CarouselItem>

                    {category.children?.length
                        ? renderCategories(category.children, level + 1)
                        : null}
                </React.Fragment>
            ));
    };


    return (

        <Carousel className="mx-10 my-2">
            <CarouselContent className="-ml-2">
                {renderCategories(data)}
            </CarouselContent>
            <CarouselPrevious className="top-1/2 -translate-y-1/2 -left-12" />
            <CarouselNext className="top-1/2 -translate-y-1/2 -right-12" />
        </Carousel>
    );
};

export default React.memo(CategoryButtons);
