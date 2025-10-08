import { notFound } from "next/navigation";

import ProRecommendedList from "@/features/product/list/recommended"
import ProHotDealList from "@/features/product/list/hot-deal"


export default async function Page(
    { params }: { params: { segments: string[] } }
) {

    const fullSlug = params?.segments?.join("/") || "";

    const match = fullSlug.match(/(.*)-i\.([\w.]+)/);

    if (!match) {
        notFound();
    }

    // ✅ Lấy các id
    const ids = match![2].split(".");
    const shop_id = ids.at(-1);

    if (!shop_id) {
        notFound();
    }
    return <div className="container space-y-5 mx-auto my-5">
        <ProRecommendedList />
        <ProHotDealList />
    </div>
}