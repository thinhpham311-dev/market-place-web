"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui";
import { ICategory } from "@/features/category/types";
import { NotFound } from "@/components/layout";
import LoadingPlaceholder from "./LoadingSkeleton";
import { cn } from "@/lib/utils";


interface CategoryButtonsProps {
    data: ICategory;
    mainId: string;
    subId?: string;
    className?: string;
    isLoading?: boolean;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
    data,
    mainId,
    subId,
    className = "",
    isLoading = false,
}) => {
    const router = useRouter();

    if (isLoading && (!data)) {
        return <LoadingPlaceholder />;
    }

    if (!isLoading && (!data)) {
        return <NotFound />;
    }

    const isParentActive = data._id === mainId && !subId;
    const isChildActive = (id: string) => id === subId;

    const getButtonClass = (active: boolean) =>
        active ? "font-bold underline text-primary" : "text-muted-foreground";


    const handleNavigate = (slug: string, catId: string, parentId?: string) => {
        const isParent = !parentId || catId === parentId;
        const path = isParent
            ? `/categories/${slug}-cat.${catId}`
            : `/categories/${slug}-cat.${parentId}.${catId}`;

        if (catId !== (subId || mainId)) {
            router.push(path);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };


    return (
        <Carousel className="mx-10 ">
            <CarouselContent className="ml-0">
                <CarouselItem className={cn("pl-0 flex justify-center", className)}>
                    <Button
                        className={`p-0 text-md ${getButtonClass(isParentActive)}`}
                        variant="link"
                        onClick={() =>
                            handleNavigate(data.category_slug, data._id)
                        }
                    >
                        {data.category_name}
                    </Button>
                </CarouselItem>

                {/* Danh mục con */}
                {data.children?.map((child: ICategory) => (
                    <CarouselItem key={child._id} className={cn("pl-2 flex justify-center", className)}>
                        <Button
                            className={`p-0 text-md ${getButtonClass(isChildActive(child._id))}`}
                            variant="link"
                            onClick={() =>
                                handleNavigate(
                                    child.category_slug,
                                    child._id,
                                    child.parent_id || data._id
                                )
                            }
                        >
                            {child.category_name}
                        </Button>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className=" top-1/2 -translate-y-1/2 -left-10  " />
            <CarouselNext className=" top-1/2 -translate-y-1/2 -right-10" />
        </Carousel >
    );
};

export default CategoryButtons;
