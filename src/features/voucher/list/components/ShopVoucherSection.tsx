"use client";

import Link from "next/link";
import { useState } from "react";
import { TicketPercent } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import NotFound from "@/components/layout/notfound";
import { useAppSelector, useTranslation } from "@/lib/hooks";
import { formatDateTime, formatToCurrency } from "@/utils/formats";
import { useFetchData } from "@/features/voucher/list/hooks/useFetchData";
import ShopVoucherSectionLoading from "@/features/voucher/list/components/ShopVoucherSectionLoading";

interface ShopVoucherSectionProps {
  shopId?: string;
}

export default function ShopVoucherSection({ shopId = "" }: ShopVoucherSectionProps) {
  const { t } = useTranslation();
  const signedIn = useAppSelector((state) => state.auth.session.signedIn);
  const { vouchers, loading, error } = useFetchData({
    shopId,
    limit: 6,
    page: 1,
  });
  const [claimedVoucherIds, setClaimedVoucherIds] = useState<string[]>([]);

  const availableVouchers = vouchers
    .filter((voucher) => voucher.status === "available")
    .slice(0, 3);

  const handleClaimVoucher = (voucherId: string) => {
    if (!signedIn) {
      toast.error(t("voucher_claim_sign_in"));
      return;
    }

    setClaimedVoucherIds((prev) => (prev.includes(voucherId) ? prev : [...prev, voucherId]));
    toast.success(t("voucher_claim_success"));
  };

  if (loading) {
    return <ShopVoucherSectionLoading />;
  }

  if (error && availableVouchers.length === 0) {
    return <NotFound message={error} />;
  }

  if (availableVouchers.length === 0) {
    return null;
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-2">
              <TicketPercent className="h-5 w-5 text-orange-600" />
              {t("header_my_vouchers")}
            </CardTitle>
            <CardDescription>{t("voucher_wallet_desc")}</CardDescription>
          </div>

          {shopId ? (
            <Button asChild type="button" size="sm" variant="outline">
              <Link href={`/user/vouchers?shopId=${shopId}`}>{t("see_more")}</Link>
            </Button>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <div className="grid gap-3 md:grid-cols-3">
          {availableVouchers.map((voucher) => (
            <Card key={voucher.discountId} className="overflow-hidden border-stone-200 shadow-none">
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{voucher.title}</p>
                  <Badge className="bg-orange-500 text-white hover:bg-orange-500">
                    {t("voucher_available")}
                  </Badge>
                </div>
                {voucher.description ? (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {voucher.description}
                  </p>
                ) : null}
                <div className="space-y-1 text-sm text-muted-foreground">
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
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
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
                    <Button
                      type="button"
                      size="sm"
                      variant={
                        claimedVoucherIds.includes(voucher.discountId) ? "secondary" : "default"
                      }
                      onClick={() => handleClaimVoucher(voucher.discountId)}
                      disabled={claimedVoucherIds.includes(voucher.discountId)}
                    >
                      {claimedVoucherIds.includes(voucher.discountId)
                        ? t("voucher_claimed")
                        : t("voucher_claim")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
