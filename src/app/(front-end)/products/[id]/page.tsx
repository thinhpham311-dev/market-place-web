import ProductDetailModule from './components/ProductDetailModule';
import RelatedProductsList from './components/RelatedProductsList';
// Icons

export default function Page() {

    return (
        <div className="space-y-10 md:my-5">
            {/* Product Details Card */}
            <ProductDetailModule />

            {/* Related Products Card */}
            <RelatedProductsList />
        </div>
    );
}
