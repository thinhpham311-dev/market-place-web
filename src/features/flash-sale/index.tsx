"use client";

import { Flame, TimerReset, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Pagination from "@/features/common/pagination";
import ProGrid from "@/features/product/components/ProGrid";
import { FLASH_SALE_LIST } from "@/features/flash-sale/constants";
import { useFetchData } from "@/features/product/list/hot-deal/hooks";
import { useTranslation } from "@/lib/hooks";

const highlightKeys = [
  "flash_sale_highlight_limited",
  "flash_sale_highlight_fast",
  "flash_sale_highlight_daily",
] as const;

export default function FlashSalePage() {
  const { t } = useTranslation();
  const {
    products,
    totalItems = 0,
    loading,
    error,
  } = useFetchData({
    storeKey: FLASH_SALE_LIST,
    defaultLimit: 18,
    defaultCurrentPage: 1,
    sortBy: "ctime",
  });

  return (
    <div className="container mx-auto my-5 space-y-5 px-3 md:px-6">
      <section className="overflow-hidden rounded-[28px] border border-red-200 bg-gradient-to-br from-red-50 via-white to-orange-100">
        <div className="grid gap-6 px-5 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-10">
          <div className="space-y-4">
            <Badge className="bg-red-500 text-white hover:bg-red-500">
              {t("flash_sale_badge")}
            </Badge>
            <div className="space-y-3">
              <h1 className="font-serif text-3xl font-semibold tracking-tight text-stone-900 md:text-5xl">
                {t("flash_sale_title")}
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-stone-600 md:text-base">
                {t("flash_sale_desc")}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-1">
            {[
              { Icon: Flame, key: highlightKeys[0] },
              { Icon: Zap, key: highlightKeys[1] },
              { Icon: TimerReset, key: highlightKeys[2] },
            ].map(({ Icon, key }) => (
              <div
                key={key}
                className="rounded-3xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur"
              >
                <div className="mb-3 inline-flex rounded-2xl bg-red-100 p-2 text-red-600">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-stone-900">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Card className="overflow-hidden border-stone-200 shadow-sm">
        <CardHeader className="space-y-4 bg-white">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-red-600">
                <Flame className="h-4 w-4" />
                {t("flash_sale_label")}
              </div>
              <CardTitle className="text-2xl text-stone-900">{t("hot_deals")}</CardTitle>
              <CardDescription className="max-w-2xl text-sm leading-6 text-stone-600">
                {t("flash_sale_page_desc")}
              </CardDescription>
            </div>

            <div className="rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
              {totalItems} {t("items_found")}
            </div>
          </div>

          <Separator />
        </CardHeader>

        <CardContent className="space-y-5 bg-stone-50/60 p-4 md:p-6">
          <ProGrid
            countLoadItems={18}
            error={error}
            data={products}
            isLoading={loading}
            className="grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6"
          />

          <Pagination
            storeKey={FLASH_SALE_LIST}
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
