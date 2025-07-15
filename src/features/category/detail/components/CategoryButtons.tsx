"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { CardContent, Button } from "@/components/ui";
import { ICategory } from "@/features/category/types";
import { NotFound } from "@/components/layout";
import LoadingPlaceholder from "./LoadingSkeleton";

interface CategoryButtonsProps {
    data: ICategory;
    mainId: string;
    subId?: string;
    isLoading?: boolean;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
    data,
    mainId,
    subId,
    isLoading = false,
}) => {
    const router = useRouter();

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

    if (isLoading && (!data)) {
        return <LoadingPlaceholder />;
    }

    if (!isLoading && (!data)) {
        return <NotFound />;
    }

    return (
        <CardContent className="p-0 flex items-center space-x-3 overflow-x-auto">
            {/* Danh mục chính */}
            <Button
                className={`p-0 text-md ${getButtonClass(isParentActive)}`}
                variant="link"
                onClick={() =>
                    handleNavigate(data.category_slug, data._id)
                }
            >
                {data.category_name}
            </Button>

            {/* Danh mục con */}
            {data.children?.map((child: ICategory) => (
                <Button
                    key={child._id}
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
            ))}
        </CardContent>
    );
};

export default CategoryButtons;
