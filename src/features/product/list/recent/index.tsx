"use client";

import ProCarousel from "@/features/product/components/ProCarousel";
import ProductListSection from "@/features/product/components/ProductListSection";
import { useTranslation } from "@/lib/hooks";
import { useFetchData } from "@/features/product/list/recent/hooks";

export default function ProRecentList() {
  const { t } = useTranslation();
  const { products = [], loading, error = null } = useFetchData();

  return (
    <ProductListSection
      title={t("recent_products")}
      description={t("recent_products_desc")}
      seeMoreHref="/recent-products"
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
