export const dynamic = "force-dynamic";

//components
import ProductDetail from './components/ProductDetail';
import ProductItemsListRelated from './components/ProductItemsListRelated';



export default async function Page({ params }: { params: { _id: string } }) {
    const { _id } = params;
    return (
        <div className="space-y-10 md:my-5">
            {/* Product Details Card */}
            <ProductDetail id={_id} />
            {/* Related Products Card */}
            <ProductItemsListRelated />
        </div>
    );
}
