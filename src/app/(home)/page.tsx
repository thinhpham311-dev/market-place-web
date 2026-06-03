import dynamic from "next/dynamic";

import Advertisement from "@/features/ads";
import CatPopularList from "@/features/category/list/popular";
import BrandListSection from "@/features/brand/list/popular";
import ProHotDealList from "@/features/product/list/hot-deal";
import ProPopularList from "@/features/product/list/popular";
import ProRecentList from "@/features/product/list/recent";
import ProSuggestionList from "@/features/product/list/suggestion";
import ShopLiveSectionLoadingSkeleton from "@/features/shop-live/LoadingSkeleton";

const ShopLiveSection = dynamic(() => import("@/features/shop-live"), {
  loading: () => <ShopLiveSectionLoadingSkeleton />,
});

export default function HomePage() {
  return (
    <div className="space-y-5">
      <div className="container mx-auto space-y-5">
        <Advertisement />
        <CatPopularList />
        <ProHotDealList />
        <ProRecentList />
        <ShopLiveSection />
        <ProPopularList />
        <ProSuggestionList />
      </div>
      <BrandListSection />
    </div>
  );
}
