"use client";

//components
import ProCarousel from "@/features/product/components/ProCarousel";
import ProductListSection from "@/features/product/components/ProductListSection";
import { useTranslation } from "@/lib/hooks";

//datas

//stores
import { useFetchData } from "./hooks";

import { FaHotjar } from "react-icons/fa";

export default function ProHotDealList() {
  const { t } = useTranslation();
  const { products = [], loading, error = null } = useFetchData();

  return (
    <div id="flash-sale">
    <ProductListSection
      title={
        <span className="flex items-center space-x-2">
          <FaHotjar color="#f73e48" />
          <span>{t("hot_deals")}</span>
        </span>
      }
      description={t("hot_deals_desc")}
      seeMoreHref="/flash-sale"
      >
      <ProCarousel
        error={error}
        countLoadItems={6}
        data={products}
        isLoading={loading}
        className="lg:basis-1/6 md:basis-1/4 basis-1/3"
        />
    </ProductListSection>
        </div>
  );
}
