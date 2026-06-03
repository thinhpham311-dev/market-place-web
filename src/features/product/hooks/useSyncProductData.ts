"use client";
import { useEffect } from "react";
import { PRO_DETAIL } from "@/features/product/constants";
import { useGetOptionSelectorValue } from "@/features/common/option-selector/hooks";
import { useFetchData as useFetchSpuData } from "@/features/spu/hooks";
import { useFetchData as useFetchSkuData } from "@/features/sku/hooks";
import { useSpuStore } from "@/features/spu/store/spuZustandStore";
import { useSkuStore } from "@/features/sku/store/skuZustandStore";

export function useSyncSpuData(product_id: string) {
  const spuData = useFetchSpuData({
    product_id,
    storeKey: PRO_DETAIL,
  });

  const setSpuData = useSpuStore((state) => state.setSpuData);

  useEffect(() => {
    setSpuData({
      spu: spuData.spu,
      loading: spuData.loading,
      error: spuData.error,
      status: spuData.status,
    });
  }, [spuData.spu, spuData.loading, spuData.error, spuData.status, setSpuData]);

  // Clean up store state when page unmounts
  useEffect(() => {
    return () => {
      setSpuData({
        spu: null,
        loading: false,
        error: null,
        status: "",
      });
    };
  }, [setSpuData]);
}

export function useSyncSkuData(product_id: string) {
  const { selectedOptions, optionsCount } = useGetOptionSelectorValue({
    storeKey: `${PRO_DETAIL}_${product_id}`,
  });

  const skuData = useFetchSkuData({
    storeKey: PRO_DETAIL,
    product_id,
    sku_tier_idx: selectedOptions,
    optionsCount,
  });

  const setSkuData = useSkuStore((state) => state.setSkuData);

  useEffect(() => {
    setSkuData({
      sku: skuData.sku,
      loading: skuData.loading,
      error: skuData.error,
      status: skuData.status,
    });
  }, [skuData.sku, skuData.loading, skuData.error, skuData.status, setSkuData]);

  // Clean up store state when page unmounts
  useEffect(() => {
    return () => {
      setSkuData({
        sku: null,
        loading: false,
        error: null,
        status: "",
      });
    };
  }, [setSkuData]);
}
