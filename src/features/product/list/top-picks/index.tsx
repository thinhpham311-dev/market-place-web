"use client";

//components
import ProCarousel from "@/features/product/components/ProCarousel";
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
    >
      <ProCarousel
        countLoadItems={6}
        error={error}
        data={products}
        isLoading={loading}
        className="lg:basis-1/6 md:basis-1/4 basis-1/3"
      />
    </ProductListSection>
  );
}
