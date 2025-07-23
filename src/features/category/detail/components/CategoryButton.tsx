"use client";

import React from "react";
import { Button } from "@/components/ui";
import { ICategory } from "@/features/category/types";
import { cn } from "@/lib/utils";
import { useNavigationActive } from "../hooks/useNavigationActive";

interface CategoryButtonProps {
    category: ICategory;
    isActive: boolean;
    lastId?: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
    category,
    isActive,
    lastId,
}) => {
    if (!lastId) return null
    const { handleNavigate } = useNavigationActive(lastId);

    return (
        <Button
            className={cn(
                "w-full line-clamp-1 p-0 text-md",
                isActive
                    ? "font-bold underline text-primary"
                    : "text-muted-foreground"
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
    );
};

export default React.memo(CategoryButton);
