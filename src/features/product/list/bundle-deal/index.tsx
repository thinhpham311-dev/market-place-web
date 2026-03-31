"use client";

//components
import ProCarousel from "@/features/product/components/ProCarousel";
import ProductListSection from "@/features/product/list/shared/components/ProductListSection";
import { useTranslation } from "@/lib/hooks";

//hooks
import { useFetchData } from "@/features/product/list/bundle-deal/hooks";

export default function ProBundleDealList() {
  const { t } = useTranslation();
  const { products, loading, error } = useFetchData();

  return (
    <ProductListSection
      title={t("bundle_deals")}
      description={t("bundle_deals_desc")}
      seeMoreHref="/daily-discover?tab=bundle-deals"
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
