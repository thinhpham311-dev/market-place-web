'use client';

import CatByCategoryId from "@/features/category/detail";
import ProListByCategoryId from "@/features/product/list/by-category-id";

export default function Page({ params }: { params: { segments: string[] } }) {
    const [fullSlug] = params.segments || [];

    const match = fullSlug?.match(/(.*)-cat\.(\w+)(?:\.(\w+))?(?:\.(\w+))?/);

    if (!match) return <div>404 Not Found</div>;

    const [, , ...rest] = match;
    return (
        <div className="space-y-5 container mx-auto my-5">
            <CatByCategoryId ids={rest} />
            <ProListByCategoryId ids={rest} />
        </div>
    );
}
