import ProductDetail from './components/ProductDetail';
import RelatedProductsList from './components/RelatedProductsList';

export default function Page() {

    return (
        <div className="space-y-10 md:my-5">
            {/* Product Details Card */}
            <ProductDetail />
            {/* Related Products Card */}
            <RelatedProductsList />
        </div>
    );
}
