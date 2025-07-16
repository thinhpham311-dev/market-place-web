export const dynamic = "force-dynamic";

// Components
import ProductDetail from './components/ProductDetail';
import ProBundleDealList from "@/features/product/list/bundle-deal"
import ProTopPicksList from "@/features/product/list/top-picks"
import ProRelatedList from "@/features/product/list/related"
import StoreInfo from './components/StoreInfo';

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const _id = slug.split('.').pop() || '';

    return (
        <div className="space-y-5 md:my-5 container mx-auto">
            <ProductDetail id={_id} />
            <StoreInfo />
            <ProTopPicksList />
            <ProBundleDealList />
            <ProRelatedList />
        </div>
    );
}
