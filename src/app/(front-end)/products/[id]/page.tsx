import ProductDetail from './components/ProductDetail';
import ProductItemsListRelated from './components/ProductItemsListRelated';

export default function Page() {

    return (
        <div className="space-y-10 md:my-5">
            {/* Product Details Card */}
            <ProductDetail />
            {/* Related Products Card */}
            <ProductItemsListRelated />
        </div>
    );
}
