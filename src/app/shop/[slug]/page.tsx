import StoreInfo from "./components/StoreInfo"
import ProRecommendedList from "@/features/product/list/recommended"
import ProHotDealList from "@/features/product/list/hot-deal"

import Advertisement from "@/features/ads"

export default async function Page() {
    return <div className="container space-y-5 mx-auto my-5">
        <StoreInfo />
        <Advertisement />
        <ProRecommendedList />
        <ProHotDealList />
    </div>
}