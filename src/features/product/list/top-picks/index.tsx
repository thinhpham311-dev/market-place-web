"use client";

//components
import ProGrid from "@/features/product/components/ProGrid";
import ProductListSection from "@/features/product/components/ProductListSection";
import { useTranslation } from "@/lib/hooks";

//hooks
import { useFetchData } from "@/features/product/list/top-picks/hooks";

//constants
import { PRO_TOPPICKS_LIST } from "@/features/product/list/top-picks/constants";

interface ProTopPicksListProps {
  shopId?: string;
}

export default function ProTopPicksList({ shopId = "" }: ProTopPicksListProps) {
  const { t } = useTranslation();
  const { products, loading, error } = useFetchData({
    storeKey: PRO_TOPPICKS_LIST,
  });
  const limitedProducts = products.slice(0, 5);
  const firstShop = products?.[0]?.product_shop;
  const resolvedShopId = firstShop?.shop_id || shopId;
  const resolvedShopSlug = firstShop?.shop_slug || "shop";
  const shopDetailHref = resolvedShopId
    ? `/shop/${resolvedShopSlug}-s.${resolvedShopId}`
    : undefined;

  return (
    <ProductListSection
      title={t("top_picks_from_shop")}
      description={t("top_picks_from_shop_desc")}
      seeMoreHref={shopDetailHref}
      seeMoreIconOnly
      className="rounded-2xl border border-stone-200/80 bg-white shadow-sm"
      headerClassName="mb-0 flex-row items-start justify-between gap-3 space-y-0 p-0"
      contentClassName="p-0 pt-4"
      titleWrapperClassName="min-w-0"
      titleClassName="mb-1"
      descriptionClassName="line-clamp-2"
    >
      <ProGrid
        countLoadItems={5}
        error={error}
        data={limitedProducts}
        isLoading={loading}
        cardOrientation="horizontal"
        className="grid-cols-1 gap-3"
      />
    </ProductListSection>
  );
}
