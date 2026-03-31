"use client";

import SpuGrid from "@/features/product/components/ProGrid";
import ProductListSection from "@/features/product/list/shared/components/ProductListSection";
import { useTranslation } from "@/lib/hooks";
// import LoadMoreTrigger from "@/features/common/infinite-scroll";

//hooks
import { useFetchData } from "@/features/product/list/suggestion/hooks";

import { PRO_SUGGESTION_LIST } from "@/features/product/list/suggestion/constants";

export default function ProSuggestionList() {
  const { t } = useTranslation();
  const { products, loading, error } = useFetchData({
    storeKey: PRO_SUGGESTION_LIST,
    defaultLimit: 12,
  });

  return (
    <ProductListSection
      title={t("daily_discover")}
      description={t("daily_discover_desc")}
      seeMoreHref="/daily-discover"
      className="shadow-nonee"
      headerClassName="col-span-12 mb-3 flex-row items-center"
      titleWrapperClassName="flex-1 p-0 text-center md:text-left"
      contentClassName="col-span-12 space-y-3"
    >
      <div className="space-y-3">
        <SpuGrid
          countLoadItems={12}
          error={error}
          data={products}
          isLoading={loading}
          className=" grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
        />
      </div>
    </ProductListSection>
  );
}
