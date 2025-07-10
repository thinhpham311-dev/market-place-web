'use client';

import CategoryItemsList from "./components/CategoryItemsList";
import ProductitemsListByCategoryId from "./components/ProductitemsListByCategoryId";

export default function Page({ params }: { params: { segments: string[] } }) {
    const [fullSlug] = params.segments || [];

    const match = fullSlug?.match(/(.*)-cat\.(\w+)(?:\.(\w+))?/);

    if (!match) return <div>404 Not Found</div>;

    const [, , mainId, subId] = match;

    return (
        <div className="space-y-5 container mx-auto my-5">
            <CategoryItemsList mainId={mainId} subId={subId} />
            <ProductitemsListByCategoryId id={subId || mainId} />
        </div>
    );
}
