"use client";

import { startTransition, useMemo } from "react";
import { Compass, Flame, ShieldCheck, Truck } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Pagination from "@/features/common/pagination";
import ProGrid from "@/features/product/components/ProGrid";
import { useFetchData } from "@/features/product/list/suggestion/hooks";
import { DAILY_DISCOVER_LIST } from "@/features/discover/daily-discover/constants";
import { useTranslation } from "@/lib/hooks";

const quickFilters = [
  {
    key: "popular",
    labelKey: "popular_tab",
    descriptionKey: "daily_discover_popular_desc",
    sortBy: "pop",
  },
  {
    key: "bundle-deals",
    labelKey: "bundle_deals_tab",
    descriptionKey: "daily_discover_bundle_deals_desc",
    sortBy: "asc",
  },
  {
    key: "recommended",
    labelKey: "recommended_tab",
    descriptionKey: "daily_discover_recommended_desc",
    sortBy: "ctime",
  },
  {
    key: "trending",
    labelKey: "trending_deals_tab",
    descriptionKey: "daily_discover_trending_desc",
    sortBy: "pop",
  },
  {
    key: "fast-delivery",
    labelKey: "fast_delivery_tab",
    descriptionKey: "daily_discover_fast_delivery_desc",
    sortBy: "ctime",
  },
  {
    key: "top-rated",
    labelKey: "top_rated_tab",
    descriptionKey: "daily_discover_top_rated_desc",
    sortBy: "ctime",
  },
  {
    key: "best-value",
    labelKey: "best_value_tab",
    descriptionKey: "daily_discover_best_value_desc",
    sortBy: "asc",
  },
  {
    key: "fresh-arrivals",
    labelKey: "fresh_arrivals_tab",
    descriptionKey: "daily_discover_fresh_arrivals_desc",
    sortBy: "ctime",
  },
];

const trustPoints = [
  {
    icon: Truck,
    labelKey: "daily_discover_trust_fast_dispatch",
    descriptionKey: "daily_discover_trust_fast_dispatch_desc",
  },
  {
    icon: ShieldCheck,
    labelKey: "daily_discover_trust_trusted_sellers",
    descriptionKey: "daily_discover_trust_trusted_sellers_desc",
  },
  {
    icon: Flame,
    labelKey: "daily_discover_trust_hot_pricing",
    descriptionKey: "daily_discover_trust_hot_pricing_desc",
  },
];

const DEFAULT_FILTER_KEY = "recommended";

export default function DailyDiscoverPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const availableFilterKeys = useMemo(() => quickFilters.map((filter) => filter.key), []);
  const queryTab = searchParams.get("tab");
  const activeFilter =
    queryTab && availableFilterKeys.includes(queryTab as (typeof quickFilters)[number]["key"])
      ? (queryTab as (typeof quickFilters)[number]["key"])
      : DEFAULT_FILTER_KEY;
  const handleSelectFilter = (filterKey: (typeof quickFilters)[number]["key"]) => {
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
    <div className="container mx-auto my-5 space-y-5 px-3 md:px-6">
      <section className="overflow-hidden rounded-[28px] border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-100">
        <div className="grid gap-6 px-5 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-10">
          <div className="space-y-4">
            <Badge className="bg-orange-500 text-white hover:bg-orange-500">
              {t("fresh_picks_daily")}
            </Badge>
            <div className="space-y-3">
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-stone-900 md:text-5xl">
                {t("daily_discover")}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-stone-600 md:text-base">
                {t("daily_discover_desc")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickFilters.map((filter) => (
                <Button
                  key={filter.key}
                  type="button"
                  variant={activeFilter === filter.key ? "default" : "outline"}
                  className={
                    activeFilter === filter.key
                      ? "rounded-full bg-orange-500 text-white hover:bg-orange-500/90"
                      : "rounded-full border-stone-200 bg-white"
                  }
                  size="sm"
                  onClick={() => handleSelectFilter(filter.key)}
                >
                  {t(filter.labelKey)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
            {trustPoints.map(({ icon: Icon, labelKey, descriptionKey }) => (
              <div
                key={labelKey}
                className="rounded-3xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur"
              >
                <div className="mb-3 inline-flex rounded-2xl bg-orange-100 p-2 text-orange-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-sm font-semibold text-stone-900">{t(labelKey)}</h2>
                <p className="mt-1 text-sm leading-6 text-stone-600">{t(descriptionKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Card className="overflow-hidden border-stone-200 shadow-sm">
        <CardHeader className="space-y-4 bg-white">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-orange-600">
                <Compass className="h-4 w-4" />
                {t("marketplace_feed")}
              </div>
              <CardTitle className="text-2xl text-stone-900">
                {t("discover_products_worth_opening")}
              </CardTitle>
              <CardDescription className="max-w-2xl text-sm leading-6 text-stone-600">
                {t("discover_products_worth_opening_desc")}
              </CardDescription>
              <p className="text-sm text-stone-500">{t(activeFilterConfig.descriptionKey)}</p>
            </div>

            <div className="rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700">
              {totalItems} {t("items_found")}
            </div>
          </div>

          <Separator />

          <div className="flex flex-wrap gap-2">
            {quickFilters.map((filter) => (
              <Badge
                key={filter.key}
                variant={activeFilter === filter.key ? "default" : "secondary"}
                className={
                  activeFilter === filter.key
                    ? "rounded-full bg-stone-900 px-4 py-2 text-white"
                    : "rounded-full px-4 py-2 text-stone-700"
                }
              >
                {t(filter.labelKey)}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-5 bg-stone-50/60 p-4 md:p-6">
          <ProGrid
            countLoadItems={18}
            error={error}
            data={displayProducts}
            isLoading={loading}
            className="grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6"
          />

          <Pagination
            storeKey={DAILY_DISCOVER_LIST}
            initialValue={{
              isShowDot: true,
              isShowNav: true,
              isShowLabel: true,
              defaultLimit: 18,
              defaultCurrentPage: 1,
              defaultTotalItems: totalItems,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
