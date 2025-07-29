"use client";

import React from "react"
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui";
import { Category } from "@/features/category/types";

interface IProBreadcrumbProps {
    categories?: Category[]; // có thể undefined
    product_name: string;
}

export default function ProBreadcrumb({
    categories = [],
    product_name,
}: IProBreadcrumbProps) {
    const hasCategories = categories.length > 0;
    return (
        <Breadcrumb className="mb-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                {hasCategories && (
                    <>
                        {categories.map((cat) => {
                            const ancestorsPath =
                                cat.ancestors && cat.ancestors.length > 0
                                    ? `${cat.ancestors.join(".")}.`
                                    : "";

                            return (
                                <React.Fragment key={cat._id}>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbLink
                                            href={`/categories/${cat.category_slug}-cat.${ancestorsPath}${cat.category_id}`}
                                        >
                                            {cat.category_name}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                </React.Fragment>
                            );
                        })}
                    </>
                )}

                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{product_name}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
