export const dynamic = "force-dynamic";

// Components
import ProductDetail from './components/ProductDetail';
import ProductItemsListRelated from './components/ProductItemsListRelated';
import ProductItemsListBundleDeals from './components/ProductItemsListBundleDeals';
import ProductItemsListTopPicksFromShop from "./components/ProductItemsListTopPicksFromShop"

import StoreInfo from './components/StoreInfo';

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const _id = slug.split('.').pop() || '';

    return (
        <div className="space-y-5 md:my-5 container mx-auto">
            <ProductDetail id={_id} />
            <StoreInfo />
            <ProductItemsListTopPicksFromShop />
            <ProductItemsListBundleDeals />
            <ProductItemsListRelated />
        </div>
    );
}
