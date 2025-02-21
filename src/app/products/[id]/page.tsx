export const dynamic = "force-dynamic";

//services
import { apiProductsList } from "@/services/ProductService";

//components
import ProductDetail from './components/ProductDetail';
import ProductItemsListRelated from './components/ProductItemsListRelated';

import { IProduct } from "@/types/product"

type productListResponse = {
    data?: {
        message?: string,
        products: IProduct[]
    }
}

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params; // Extracting id from route
    const res = await apiProductsList();
    const { data } = res as productListResponse

    return (
        <div className="space-y-10 md:my-5">
            {/* Product Details Card */}
            <ProductDetail id={id} />
            {/* Related Products Card */}
            <ProductItemsListRelated data={data?.products} />
        </div>
    );
}
