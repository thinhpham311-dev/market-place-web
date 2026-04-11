"use client";

import Link from "next/link";
import { TicketPercent, WalletCards, CircleCheckBig, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/lib/hooks";
import { formatToCurrency, formatDateTime } from "@/utils/formats";
import { useVoucherListContext } from "@/features/voucher/list/hooks/useVoucherListContext";
import type { VoucherItem, VoucherStatus } from "@/features/voucher/list/types";
import VoucherShopInfoDialog from "@/features/voucher/list/components/VoucherShopInfoDialog";
import VoucherListLoading from "@/features/voucher/list/components/VoucherListLoading";

const voucherTabs: VoucherStatus[] = ["available", "used", "expired"];

function VoucherStatusBadge({ status }: { status: VoucherStatus }) {
  const { t } = useTranslation();

  if (status === "used") {
    return (
      <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">{t("voucher_used")}</Badge>
    );
  }

  if (status === "expired") {
    return <Badge variant="secondary">{t("voucher_expired")}</Badge>;
  }

  return (
    <Badge className="bg-orange-500 text-white hover:bg-orange-500">{t("voucher_available")}</Badge>
  );
}

function VoucherDiscountValue({ voucher }: { voucher: VoucherItem }) {
  const { t } = useTranslation();

  if (voucher.discountType === "percentage") {
    return (
      <span>
        {voucher.discountValue}%{" "}
        {voucher.maxDiscountAmount > 0
          ? `(${t("voucher_max_discount")}: ${formatToCurrency(voucher.maxDiscountAmount)})`
          : ""}
      </span>
    );
  }

  return <span>{formatToCurrency(voucher.discountValue || voucher.discountAmount)}</span>;
}

export default function VoucherListPage() {
  const { t } = useTranslation();
  const {
    vouchers,
    loading,
    error,
    shopId: resolvedShopId,
    summary,
    claimedVoucherIds,
    handleClaimVoucher,
  } = useVoucherListContext();

  const resolvedVouchers = vouchers;

  return (
    <div className="container mx-auto space-y-5 px-3 py-5 md:px-6">
      <section className="grid w-full gap-4 md:grid-cols-3">
        <Card className="border-none bg-gradient-to-r from-orange-50 via-white to-amber-50 shadow-sm md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <TicketPercent className="h-6 w-6 text-orange-600" />
              {t("header_my_vouchers")}
            </CardTitle>
            <CardDescription>
              {t("voucher_wallet_desc")} {resolvedShopId ? `#${resolvedShopId}` : ""}
            </CardDescription>
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

      <Card className="w-full shadow-sm">
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
                    <VoucherListLoading />
                  ) : items.length === 0 ? (
                    <div className="rounded-2xl border border-dashed p-8 text-center text-muted-foreground">
                      {t("voucher_empty")}
                    </div>
                  ) : (
                    items.map((voucher) => (
                      <Card
                        key={voucher.discountId}
                        className="overflow-hidden border-stone-200 shadow-none"
                      >
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
                                <p className="text-sm text-muted-foreground">
                                  {voucher.description}
                                </p>
                              ) : null}
                              <div className="grid gap-1 text-sm text-muted-foreground md:grid-cols-2">
                                {voucher.code ? (
                                  <p>
                                    {t("voucher_code")}: {voucher.code}
                                  </p>
                                ) : null}
                                {voucher.shopId ? (
                                  <div className="flex flex-wrap items-center gap-2">
                                    <p>
                                      {t("voucher_shop_id")}: {voucher.shopId}
                                    </p>
                                    <VoucherShopInfoDialog shopId={voucher.shopId} />
                                  </div>
                                ) : null}
                                <p>
                                  {t("voucher_discount_type")}:{" "}
                                  {t(
                                    voucher.discountType === "percentage"
                                      ? "voucher_type_percentage"
                                      : "voucher_type_amount",
                                  )}
                                </p>
                                <p>
                                  {t("voucher_discount_value")}:{" "}
                                  <VoucherDiscountValue voucher={voucher} />
                                </p>
                                {voucher.maxDiscountAmount > 0 ? (
                                  <p>
                                    {t("voucher_max_discount")}:{" "}
                                    {formatToCurrency(voucher.maxDiscountAmount)}
                                  </p>
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
                                  <p>
                                    {t("voucher_usage_limit")}: {voucher.usageLimit}
                                  </p>
                                ) : null}
                                {voucher.usageCount > 0 ? (
                                  <p>
                                    {t("voucher_usage_count")}: {voucher.usageCount}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="text-left md:text-right">
                            <p className="text-sm text-muted-foreground">
                              {t("voucher_discount_amount")}
                            </p>
                            <p className="text-2xl font-semibold text-orange-600">
                              <VoucherDiscountValue voucher={voucher} />
                            </p>
                            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground md:justify-end md:gap-4">
                              <span>
                                {t("voucher_min_spend")}: {formatToCurrency(voucher.minSpend)}
                              </span>
                              <div className="flex items-center gap-2">
                                <Button asChild type="button" size="sm" variant="outline">
                                  <Link
                                    href={`/user/vouchers/${voucher.discountId}${voucher.shopId ? `?shopId=${voucher.shopId}` : ""}`}
                                  >
                                    {t("voucher_view_details")}
                                  </Link>
                                </Button>
                                {status === "available" ? (
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant={
                                      claimedVoucherIds.includes(voucher.discountId)
                                        ? "secondary"
                                        : "default"
                                    }
                                    onClick={() => handleClaimVoucher(voucher.discountId)}
                                    disabled={claimedVoucherIds.includes(voucher.discountId)}
                                  >
                                    {claimedVoucherIds.includes(voucher.discountId)
                                      ? t("voucher_claimed")
                                      : t("voucher_claim")}
                                  </Button>
                                ) : null}
                              </div>
                            </div>
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
