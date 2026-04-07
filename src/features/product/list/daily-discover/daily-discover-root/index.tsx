"use client";

import { startTransition, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFetchData } from "@/features/product/list/suggestion/hooks";
import { DAILY_DISCOVER_LIST } from "@/features/product/list/daily-discover/constants";
import DailyDiscoverPage, {
  DEFAULT_FILTER_KEY,
  quickFilters,
} from "@/features/product/list/daily-discover";
import DailyDiscoverProvider from "@/features/product/list/daily-discover/providers";
import type { DailyDiscoverFilterKey } from "@/features/product/list/daily-discover/types";

export default function DailyDiscoverRoot() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const availableFilterKeys = useMemo(() => quickFilters.map((filter) => filter.key), []);
  const queryTab = searchParams.get("tab");
  const activeFilter =
    queryTab && availableFilterKeys.includes(queryTab as DailyDiscoverFilterKey)
      ? (queryTab as DailyDiscoverFilterKey)
      : DEFAULT_FILTER_KEY;

  const handleSelectFilter = (filterKey: DailyDiscoverFilterKey) => {
    if (filterKey === activeFilter) {
      return;
    }

    const nextParams = new URLSearchParams(searchParams.toString());

    if (filterKey === DEFAULT_FILTER_KEY) {
      nextParams.delete("tab");
    } else {
      nextParams.set("tab", filterKey);
    }

    const nextQuery = nextParams.toString();

    startTransition(() => {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    });
  };

  const activeFilterConfig =
    quickFilters.find((filter) => filter.key === activeFilter) ?? quickFilters[0];
  const {
    products,
    totalItems = 0,
    loading,
    error,
  } = useFetchData({
    storeKey: DAILY_DISCOVER_LIST,
    defaultLimit: 18,
    sortBy: activeFilterConfig.sortBy,
  });

  const displayProducts = useMemo(() => {
    const nextProducts = [...products];

    switch (activeFilter) {
      case "top-rated":
        return nextProducts.sort(
          (left, right) =>
            (right.product_ratingsAverange ?? 0) - (left.product_ratingsAverange ?? 0),
        );
      case "fast-delivery":
        return nextProducts.sort((left, right) => left.product_price - right.product_price);
      default:
        return nextProducts;
    }
  }, [activeFilter, products]);

  return (
    <DailyDiscoverProvider
      contextValues={{
        activeFilter,
        activeFilterConfig,
        displayProducts,
        totalItems,
        loading,
        error,
        handleSelectFilter,
      }}
    >
      <DailyDiscoverPage />
    </DailyDiscoverProvider>
  );
}
