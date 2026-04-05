import { notFound } from "next/navigation";
import ProDetail from "@/features/product";
import ProBundleDealList from "@/features/product/list/bundle-deal";
import ProTopPicksList from "@/features/product/list/top-picks";
import ProRelatedList from "@/features/product/list/related";

export default function Page({ params }: { params: { segments: string[] } }) {
  const fullSlug = params?.segments?.join("/") || "";

  const match = fullSlug.match(/(.*)-i\.([\w.]+)/);

  if (!match) {
    notFound();
  }

  // ✅ Lấy các id
  const ids = match![2].split(".");
  const product_id = ids.at(-1);
  const shop_id = ids.at(0);

  if (!product_id) {
    notFound();
  }

  return (
    <div className="space-y-5 md:my-5 container mx-auto">
      <ProDetail product_id={product_id} shop_id={shop_id} />
      <ProTopPicksList shopId={shop_id} />
      <ProBundleDealList />
      <ProRelatedList shopId={shop_id} />
    </div>
  );
}
