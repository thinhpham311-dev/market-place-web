'use client'
//components
import ProductitemsListByCategoryId from "./components/ProductitemsListByCategoryId";

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const _id = slug.split('.').pop() || '';

    return (
        <div className="space-y-10 container mx-auto">
            <ProductitemsListByCategoryId id={_id} />
        </div>
    );
}


