"use client";

//components
import ProCarousel from "@/features/product/components/ProCarousel";
import ProductListSection from "@/features/product/components/ProductListSection";
import { useTranslation } from "@/lib/hooks";

//hooks
import { useFetchData } from "@/features/product/list/related/hooks";

interface ProRelatedListProps {
  shopId?: string;
}

export default function ProRelatedList({ shopId = "" }: ProRelatedListProps) {
  const { t } = useTranslation();
  const { products, loading, error } = useFetchData();
  const firstShop = products?.[0]?.product_shop;
  const resolvedShopId = firstShop?.shop_id || shopId;
  const resolvedShopSlug = firstShop?.shop_slug || "shop";
  const shopDetailHref = resolvedShopId
    ? `/shop/${resolvedShopSlug}-s.${resolvedShopId}`
    : undefined;

  return (
    <ProductListSection
      title={t("from_the_same_shop")}
      description={t("from_the_same_shop_desc")}
      seeMoreHref={shopDetailHref}
      className="shadow-nonee"
    >
      <ProCarousel
        error={error}
        countLoadItems={6}
        data={products}
        isLoading={loading}
        className="lg:basis-1/6 md:basis-1/4 basis-1/3"
      />
    </ProductListSection>
  );
}
