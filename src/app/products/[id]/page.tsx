export const dynamic = "force-dynamic";

//components
import ProductDetail from './components/ProductDetail';
import ProductItemsListRelated from './components/ProductItemsListRelated';



export default async function Page({ params }: { params: { id: string } }) {
    const { id } = params; // Extracting id from route

    return (
        <div className="space-y-10 md:my-5">
            {/* Product Details Card */}
            <ProductDetail id={id} />
            {/* Related Products Card */}
            <ProductItemsListRelated />
        </div>
    );
}
