"use client";

import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui";

type Category = {
    _id: string;
    category_name: string;
    category_slug: string;
};

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
                        {categories.map((category) => (
                            <>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem key={category._id}>
                                    <BreadcrumbLink
                                        href={`/categories/${category.category_slug}-cat.${category._id}`}
                                    >
                                        {category.category_name}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </>
                        ))}
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
