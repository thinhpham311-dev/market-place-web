"use client";

//components
import ProCarousel from "@/features/product/components/ProCarousel";
import ProductListSection from "@/features/product/list/shared/components/ProductListSection";
import { useTranslation } from "@/lib/hooks";

//hooks
import { useFetchData } from "@/features/product/list/top-picks/hooks";

//constants
import { PRO_TOPPICKS_LIST } from "@/features/product/list/top-picks/constants";

export default function ProTopPicksList() {
  const { t } = useTranslation();
  const { products, loading, error } = useFetchData({
    storeKey: PRO_TOPPICKS_LIST,
  });

  return (
    <ProductListSection
      title={t("top_picks_from_shop")}
      description={t("top_picks_from_shop_desc")}
      seeMoreHref="/categories/1"
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
