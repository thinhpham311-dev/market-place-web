
// Components
// import ProductDetail from './components/ProductDetail';
// import ProBundleDealList from "@/features/product/list/bundle-deal"
// import ProTopPicksList from "@/features/product/list/top-picks"
// import ProRelatedList from "@/features/product/list/related"
// import StoreInfo from './components/StoreInfo';
// import ProDetail from "@/features/product/detail";
// import ProRelatedList from "@/features/product/list/related";
// import ProductReview from "@/features/reviews"

import dynamic from "next/dynamic";

const ProDetail = dynamic(() => import('@/features/product/detail'), {
    ssr: false,
});
const ProductReview = dynamic(() => import('@/features/reviews'), {
    ssr: false,
});
const ProTopPicksList = dynamic(() => import('@/features/product/list/top-picks'), {
    ssr: false,
});
const ProBundleDealList = dynamic(() => import('@/features/product/list/bundle-deal'), {
    ssr: false,
});
const ProRelatedList = dynamic(() => import('@/features/product/list/related'), {
    ssr: false,
});


export default async function Page(
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
