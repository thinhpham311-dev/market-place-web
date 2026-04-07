"use client";

//components
import ProCarousel from "@/features/product/components/ProCarousel";
import ProductListSection from "@/features/product/components/ProductListSection";
import { useTranslation } from "@/lib/hooks";

//hooks
import { useFetchData } from "./hooks";
import { PRO_POPULAR_LIST } from "./constants";

export default function ProPopularList() {
  const { t } = useTranslation();
  const { products, loading, error } = useFetchData({
    storeKey: PRO_POPULAR_LIST,
    defaultLimit: 12,
  });

  return (
    <ProductListSection
      title={t("popular_products")}
      description={t("popular_products_desc")}
      seeMoreHref="/daily-discover?tab=popular"
    >
      <ProCarousel
        countLoadItems={6}
        data={products}
        isLoading={loading}
        error={error}
        className="lg:basis-1/6 md:basis-1/4 basis-1/3"
      />
    </ProductListSection>
  );
}
