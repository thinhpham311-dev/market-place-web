"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/hooks";
import type { VoucherItem } from "@/features/voucher/list/hooks/useFetchData";

interface VoucherUsageCardProps {
  voucher: VoucherItem;
}

export default function VoucherUsageCard({ voucher }: VoucherUsageCardProps) {
  const { t } = useTranslation();

  return (
    <Card className="h-full border-stone-200 shadow-none">
      <CardHeader>
        <CardTitle>{t("voucher_usage_title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        {voucher.code ? (
          <p>
            {t("voucher_code")}: {voucher.code}
          </p>
        ) : null}
        {voucher.shopId ? (
          <p>
            {t("voucher_shop_id")}: {voucher.shopId}
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
        {voucher.orderId ? (
          <p>
            {t("voucher_used_on_order")}: {voucher.orderId}
          </p>
        ) : null}
        <p>
          {voucher.status === "available"
            ? t("voucher_apply_on_checkout")
            : voucher.status === "used"
              ? t("voucher_status_saved")
              : t("voucher_expired_on")}
        </p>
      </CardContent>
    </Card>
  );
}
