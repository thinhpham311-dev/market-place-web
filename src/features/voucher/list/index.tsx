"use client";

import { useMemo } from "react";
import { TicketPercent, WalletCards, CircleCheckBig, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppSelector, useTranslation } from "@/lib/hooks";
import { formatToCurrency, formatDateTime } from "@/utils/formats";
import { useFetchData, type VoucherStatus } from "@/features/voucher/list/hooks/useFetchData";

const voucherTabs: VoucherStatus[] = ["available", "used", "expired"];

function VoucherStatusBadge({ status }: { status: VoucherStatus }) {
  const { t } = useTranslation();

  if (status === "used") {
    return <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">{t("voucher_used")}</Badge>;
  }

  if (status === "expired") {
    return <Badge variant="secondary">{t("voucher_expired")}</Badge>;
  }

  return <Badge className="bg-orange-500 text-white hover:bg-orange-500">{t("voucher_available")}</Badge>;
}

function VoucherDiscountValue({ voucher }: { voucher: ReturnType<typeof useFetchData>["vouchers"][number] }) {
  const { t } = useTranslation();

  if (voucher.discountType === "percentage") {
    return (
      <span>
        {voucher.discountValue}% {voucher.maxDiscountAmount > 0 ? `(${t("voucher_max_discount")}: ${formatToCurrency(voucher.maxDiscountAmount)})` : ""}
      </span>
    );
  }

  return <span>{formatToCurrency(voucher.discountValue || voucher.discountAmount)}</span>;
}

export default function VoucherListPage() {
  const { t } = useTranslation();
  const signedIn = useAppSelector((state) => state.auth.session.signedIn);
  const { vouchers, loading, error, shopId } = useFetchData();

  const summary = useMemo(() => {
    return {
      available: vouchers.filter((voucher) => voucher.status === "available").length,
      used: vouchers.filter((voucher) => voucher.status === "used").length,
      expired: vouchers.filter((voucher) => voucher.status === "expired").length,
    };
  }, [vouchers]);

  const resolvedVouchers = signedIn ? vouchers : [];

  return (
    <div className="container mx-auto space-y-5 px-3 py-5 md:px-6">
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-none bg-gradient-to-r from-orange-50 via-white to-amber-50 shadow-sm md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <TicketPercent className="h-6 w-6 text-orange-600" />
              {t("header_my_vouchers")}
            </CardTitle>
            <CardDescription>{t("voucher_wallet_desc")} {shopId ? `#${shopId}` : ""}</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
              <WalletCards className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("voucher_available")}</p>
              <p className="text-xl font-semibold">{summary.available}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600">
              <CircleCheckBig className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("voucher_used")}</p>
              <p className="text-xl font-semibold">{summary.used}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="rounded-2xl bg-stone-200 p-3 text-stone-700">
              <Clock3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("voucher_expired")}</p>
              <p className="text-xl font-semibold">{summary.expired}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>{t("header_my_vouchers")}</CardTitle>
          <CardDescription>{error || t("voucher_wallet_desc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="available" className="space-y-4">
            <TabsList className="h-auto flex-wrap justify-start rounded-2xl p-1">
              {voucherTabs.map((status) => (
                <TabsTrigger key={status} value={status} className="rounded-xl">
                  {t(`voucher_${status}` as never)}
                </TabsTrigger>
              ))}
            </TabsList>

            {voucherTabs.map((status) => {
              const items = resolvedVouchers.filter((voucher) => voucher.status === status);

              return (
                <TabsContent key={status} value={status} className="space-y-4">
                  {loading ? (
                    <div className="space-y-4">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index} className="overflow-hidden border-stone-200 shadow-none">
                          <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5">
                            <div className="flex items-start gap-4">
                              <div className="h-11 w-11 rounded-2xl bg-orange-100" />
                              <div className="space-y-2">
                                <div className="h-5 w-48 rounded bg-stone-200" />
                                <div className="h-4 w-72 max-w-full rounded bg-stone-100" />
                                <div className="h-4 w-40 rounded bg-stone-100" />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="ml-auto h-4 w-28 rounded bg-stone-100" />
                              <div className="ml-auto h-7 w-24 rounded bg-orange-100" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : items.length === 0 ? (
                    <div className="rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
                      {t("voucher_empty")}
                    </div>
                  ) : (
                    items.map((voucher) => (
                      <Card key={voucher.id} className="overflow-hidden border-stone-200 shadow-none">
                        <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5">
                          <div className="flex items-start gap-4">
                            <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
                              <TicketPercent className="h-5 w-5" />
                            </div>
                            <div className="space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-semibold">{voucher.title}</h3>
                                <VoucherStatusBadge status={voucher.status} />
                              </div>
                              {voucher.description ? (
                                <p className="text-sm text-muted-foreground">{voucher.description}</p>
                              ) : null}
                              <div className="grid gap-1 text-sm text-muted-foreground md:grid-cols-2">
                                {voucher.code ? <p>{t("voucher_code")}: {voucher.code}</p> : null}
                                {voucher.shopId ? <p>{t("voucher_shop_id")}: {voucher.shopId}</p> : null}
                                <p>{t("voucher_discount_type")}: {t(voucher.discountType === "percentage" ? "voucher_type_percentage" : "voucher_type_amount")}</p>
                                <p>{t("voucher_discount_value")}: <VoucherDiscountValue voucher={voucher} /></p>
                                <p>{t("voucher_min_spend")}: {formatToCurrency(voucher.minSpend)}</p>
                                {voucher.maxDiscountAmount > 0 ? (
                                  <p>{t("voucher_max_discount")}: {formatToCurrency(voucher.maxDiscountAmount)}</p>
                                ) : null}
                                {voucher.validFrom ? (
                                  <p>
                                    {t("voucher_valid_from")}:{" "}
                                    {formatDateTime(voucher.validFrom, {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </p>
                                ) : null}
                                {status === "used" && voucher.orderId ? (
                                  <p>
                                    {t("voucher_used_on_order")}: {voucher.orderId}
                                  </p>
                                ) : voucher.validUntil ? (
                                  <p>
                                    {t("voucher_valid_until")}:{" "}
                                    {formatDateTime(voucher.validUntil, {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </p>
                                ) : null}
                                {voucher.usageLimit > 0 ? (
                                  <p>{t("voucher_usage_limit")}: {voucher.usageLimit}</p>
                                ) : null}
                                {voucher.usageCount > 0 ? (
                                  <p>{t("voucher_usage_count")}: {voucher.usageCount}</p>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="text-left md:text-right">
                            <p className="text-sm text-muted-foreground">{t("voucher_discount_amount")}</p>
                            <p className="text-2xl font-semibold text-orange-600">
                              <VoucherDiscountValue voucher={voucher} />
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {status === "available"
                                ? t("voucher_apply_on_checkout")
                                : status === "used"
                                  ? t("voucher_status_saved")
                                  : t("voucher_expired_on")}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
