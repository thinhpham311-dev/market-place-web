"use client";
import ProGrid from "@/features/product/components/ProGrid";
import Pagination from "@/features/common/pagination";
import ProductListSection from "@/features/product/list/shared/components/ProductListSection";
import { useTranslation } from "@/lib/hooks";

//hooks
import { useFetchData } from "@/features/product/list/search/hooks";

///constants
import { PRO_SEARCH_LIST } from "@/features/product/list/search/constants";

export default function ProSearchList() {
  const { t } = useTranslation();
  const { products, totalItems, error, loading } = useFetchData({
    keyword: "",
    storeKey: PRO_SEARCH_LIST,
  });

  return (
    <ProductListSection
      title={t("search_products")}
      description={t("search_products_desc")}
      seeMoreHref="/categories/1"
    >
      <div className="space-y-3">
        <ProGrid
          countLoadItems={12}
          error={error}
          data={products}
          className="lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-3"
          isLoading={loading}
        />
        <Pagination
          storeKey={PRO_SEARCH_LIST}
          initialValue={{
            isShowDot: true,
            isShowNav: true,
            defaultLimit: 15,
            defaultTotalItems: totalItems,
            defaultCurrentPage: 1,
          }}
        />
      </div>
    </ProductListSection>
  );
}
