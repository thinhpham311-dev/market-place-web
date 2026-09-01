import { notFound } from "next/navigation";
import ShopDetail from "@/features/shop/shop-detail";
import ProRecommendedList from "@/features/product/list/recommended";
import ProHotDealList from "@/features/product/list/hot-deal";

export default async function Page({ params }: { params: { segments: string[] } }) {
  const fullSlug = params?.segments?.join("/") || "";

  const match = fullSlug.match(/(.*)-s\.([\w.]+)/);

  if (!match) {
    notFound();
  }

  const ids = match![2].split(".");
  const shop_id = ids.at(-1);

  return (
    <div className="space-y-5">
      <ShopDetail shop_id={shop_id} />
      <div className="container mx-auto space-y-5">
        <ProRecommendedList />
        <ProHotDealList />
      </div>
    </div>
  );
}
