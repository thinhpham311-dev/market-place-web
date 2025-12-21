"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Category } from "@/features/category/types";
import { cn } from "@/utils/styles";
import { useNavigationActive } from "@/features/category/hooks/useNavigationActive";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";

interface CategoryButtonProps {
    category: Category;
    isActive: boolean;
    lastId?: string;
    isLoading?: boolean;
    className?: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
    category,
    isActive,
    lastId,
    isLoading,
    className
}) => {
    if (!lastId) return null

    if (isLoading) {
        return <LoadingSkeleton className="h-10" />
    }

    if (!category) {
        return <NotFound />
    }

    const { category_id, category_slug, category_name, ancestors } = category;

    const { handleNavigate } = useNavigationActive(lastId);

    return (
        <Button
            className={cn(className,
                " line-clamp-1 text-md",
                isActive
                    ? "font-bold underline text-primary"
                    : "text-muted-foreground"
            )}
            variant="outline"
            onClick={() =>
                handleNavigate(
                    category_slug,
                    category_id,
                    ancestors
                )
            }
        >
            {category_name}
        </Button>
    );
};

export default React.memo(CategoryButton);
