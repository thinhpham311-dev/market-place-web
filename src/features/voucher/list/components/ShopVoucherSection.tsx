"use client";

import { TicketPercent } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import NotFound from "@/components/layout/notfound";
import { useTranslation } from "@/lib/hooks";
import { formatDateTime, formatToCurrency } from "@/utils/formats";
import { useFetchData } from "@/features/voucher/list/hooks/useFetchData";

interface ShopVoucherSectionProps {
  shopId?: string;
}

export default function ShopVoucherSection({ shopId = "" }: ShopVoucherSectionProps) {
  const { t } = useTranslation();
  const { vouchers, loading, error } = useFetchData({
    shopId,
    limit: 6,
    page: 1,
  });

  const availableVouchers = vouchers.filter((voucher) => voucher.status === "available").slice(0, 3);

  if (loading) {
    return (
      <Card className="border-none shadow-none">
        <CardHeader className="px-0">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </CardHeader>
        <CardContent className="grid gap-3 px-0 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="border-stone-200 shadow-none">
              <CardContent className="space-y-3 p-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-7 w-24" />
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error && availableVouchers.length === 0) {
    return <NotFound message={error} />;
  }

  if (availableVouchers.length === 0) {
    return null;
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="flex items-center gap-2">
          <TicketPercent className="h-5 w-5 text-orange-600" />
          {t("header_my_vouchers")}
        </CardTitle>
        <CardDescription>{t("voucher_wallet_desc")}</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-3 px-0 md:grid-cols-3">
        {availableVouchers.map((voucher) => (
          <Card key={voucher.id} className="overflow-hidden border-stone-200 shadow-none">
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{voucher.title}</p>
                <Badge className="bg-orange-500 text-white hover:bg-orange-500">
                  {t("voucher_available")}
                </Badge>
              </div>
              {voucher.description ? (
                <p className="line-clamp-2 text-sm text-muted-foreground">{voucher.description}</p>
              ) : null}
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  {t("voucher_min_spend")}: {formatToCurrency(voucher.minSpend)}
                </p>
                {voucher.validUntil ? (
                  <p>
                    {t("voucher_valid_until")}:{" "}
                    {formatDateTime(voucher.validUntil, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                ) : null}
              </div>
              <p className="text-xl font-semibold text-orange-600">
                {formatToCurrency(voucher.discountAmount)}
              </p>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
