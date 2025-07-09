'use client'
//components
import ProductitemsListByCategoryId from "./components/ProductitemsListByCategoryId";

export default function Page({ params }: { params: { _id: string } }) {
    const { _id } = params;

    return (
        <div className="space-y-10 container mx-auto">
            <ProductitemsListByCategoryId id={_id} />
        </div>
    );
}


