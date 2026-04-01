"use client";
import { useEffect } from "react";

//components
import ProCarousel from "@/features/product/components/ProCarousel";
import ProductListSection from "@/features/product/list/shared/components/ProductListSection";
import { useTranslation } from "@/lib/hooks";

//datas
// import { productData } from "@/constants/data";

//stores
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProductList } from "./store/dataSlice";
import { selectProRecommendedListByStoreKey } from "./store/selectors";
import reducer from "./store";
import { injectReducer } from "@/store";

import { PRO_RECOMMENDDED_LIST } from "./constants";

injectReducer(PRO_RECOMMENDDED_LIST, reducer);

export default function ProRecommendedList() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const {
    products = [],
    loading,
    error = null,
  } = useAppSelector(selectProRecommendedListByStoreKey(PRO_RECOMMENDDED_LIST));

  useEffect(() => {
    const promise = dispatch(getProductList({ limit: 12, sortBy: "ctime", page: 1 }) as any);
    return () => {
      promise.abort();
    };
  }, [dispatch]);

  return (
    <ProductListSection
      title={t("recommended_for_you")}
      description={t("recommended_for_you_desc")}
      seeMoreHref="/daily-discover"
      contentClassName="col-span-12"
    >
      <ProCarousel
        countLoadItems={15}
        data={products}
        isLoading={loading}
        error={error}
        className="lg:basis-1/6 md:basis-1/4 basis-1/3"
      />
    </ProductListSection>
  );
}
