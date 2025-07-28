
// Components
import ProBundleDealList from "@/features/product/list/bundle-deal"
import ProTopPicksList from "@/features/product/list/top-picks"
import ProRelatedList from "@/features/product/list/related"
// import StoreInfo from './components/StoreInfo';
import ProDetail from "@/features/product/detail";
import ProductReview from "@/features/reviews"


export default function Page(
    { params }: { params: { segments: string[] } }
) {
    const [fullSlug] = params.segments || [];

    const match = fullSlug?.match(/(.*)-i\.(\w+)(?:\.(\w+))?/);

    if (!match) return <div>404 Not Found</div>;

    const [, , ...rest] = match;
    return (
        <div className="space-y-5 md:my-5 container mx-auto">
            <ProDetail ids={rest} />
            <ProductReview />
            {/* <StoreInfo />*/}
            <ProTopPicksList />
            <ProBundleDealList />
            <ProRelatedList />
        </div>
    );
}
