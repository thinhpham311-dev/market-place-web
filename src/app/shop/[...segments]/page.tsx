import dynamic from "next/dynamic";

import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui";
// import ShopDetail from "@/features/shop/shop-detail";
// import ProRecommendedList from "@/features/product/list/recommended"
// import ProHotDealList from "@/features/product/list/hot-deal"


const ShopDetail = dynamic(() => import('@/features/shop/shop-detail'), {
    ssr: false,
    loading: () => <Skeleton className="w-full h-10" />,

});
const ProRecommendedList = dynamic(() => import('@/features/product/list/recommended'), {
    ssr: false,
    loading: () => <Skeleton className="w-full h-lvh" />,

});

const ProHotDealList = dynamic(() => import('@/features/product/list/hot-deal'), {
    ssr: false,
    loading: () => <Skeleton className="w-full h-lvh" />,

});

export default async function Page(
    { params }: { params: { segments: string[] } }
) {
    const fullSlug = params?.segments?.join("/") || "";

    const match = fullSlug.match(/(.*)-s\.([\w.]+)/);


    if (!match) {
        notFound();
    }

    const ids = match![2].split(".");
    const shop_id = ids.at(-1);

    return <div className="container space-y-5 mx-auto my-5">
        <ShopDetail shop_id={shop_id} />
        <ProRecommendedList />
        <ProHotDealList />
    </div>
}