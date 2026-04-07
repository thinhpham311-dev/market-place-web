"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/hooks";
import { formatDateTime, formatToCurrency } from "@/utils/formats";
import { useVoucherDetailContext } from "@/features/voucher/detail/hooks/useVoucherDetailContext";

export default function VoucherTermsCard() {
  const { t } = useTranslation();
  const { voucher, discountSummary } = useVoucherDetailContext();

  return (
    <Card className="h-full border-stone-200 shadow-none lg:col-span-2">
      <CardHeader>
        <CardTitle>{t("voucher_terms_title")}</CardTitle>
        {voucher.description ? <CardDescription>{voucher.description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
        <p>
          {t("voucher_discount_type")}:{" "}
          {t(
            voucher.discountType === "percentage"
              ? "voucher_type_percentage"
              : "voucher_type_amount",
          )}
        </p>
        <p>
          {t("voucher_discount_value")}: {discountSummary}
        </p>
        <p>
          {t("voucher_min_spend")}:{" "}
          {voucher.minSpend > 0
            ? formatToCurrency(voucher.minSpend)
            : t("voucher_no_minimum_spend")}
        </p>
        {voucher.maxDiscountAmount > 0 ? (
          <p>
            {t("voucher_max_discount")}: {formatToCurrency(voucher.maxDiscountAmount)}
          </p>
        ) : null}
        {voucher.validFrom ? (
          <p>
            {t("voucher_valid_from")}:{" "}
            {formatDateTime(voucher.validFrom, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        ) : null}
        {voucher.validUntil ? (
          <p>
            {t("voucher_valid_until")}:{" "}
            {formatDateTime(voucher.validUntil, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
