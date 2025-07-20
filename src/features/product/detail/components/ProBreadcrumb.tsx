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
}

interface IProBreadcrumbProps {
    categories: Category[]
    product_name: string;
}

export default function ProBreadcrumb({
    categories,
    product_name }: IProBreadcrumbProps) {
    return (
        <Breadcrumb className="mb-4">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {
                    categories.map((_) => {
                        return (
                            <BreadcrumbItem key={_._id}>
                                <BreadcrumbLink href={`/categories/${_.category_slug}-cat.${_._id}`}>
                                    {_.category_name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        )
                    })
                }
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{product_name}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}
