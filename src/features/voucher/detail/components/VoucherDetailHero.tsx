"use client";

import { CircleCheckBig, Store, TicketPercent } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/lib/hooks";
import { useVoucherDetailContext } from "@/features/voucher/detail/hooks/useVoucherDetailContext";

export default function VoucherDetailHero() {
  const { t } = useTranslation();
  const { voucher, discountSummary, isClaimed, onClaim } = useVoucherDetailContext();

  return (
    <Card className="w-full overflow-hidden border-none shadow-sm">
      <CardHeader className="bg-gradient-to-r from-orange-50 via-white to-amber-50">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-orange-100 p-3 text-orange-600">
                <TicketPercent className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-2xl">{voucher.title}</CardTitle>
                <CardDescription>{t("voucher_detail_desc")}</CardDescription>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-orange-500 text-white hover:bg-orange-500">
                {t(`voucher_${voucher.status}` as never)}
              </Badge>
              {voucher.code ? <Badge variant="outline">{voucher.code}</Badge> : null}
              {voucher.shopId ? (
                <Badge variant="outline" className="gap-1">
                  <Store className="h-3.5 w-3.5" />
                  {voucher.shopId}
                </Badge>
              ) : null}
            </div>
          </div>

          <div className="text-left lg:text-right">
            <p className="text-sm text-muted-foreground">{t("voucher_discount_summary")}</p>
            <p className="text-3xl font-semibold text-orange-600">{discountSummary}</p>
            <div className="mt-3">
              {voucher.status === "available" ? (
                <Button
                  type="button"
                  variant={isClaimed ? "secondary" : "default"}
                  onClick={onClaim}
                  disabled={isClaimed}
                >
                  {isClaimed ? (
                    <>
                      <CircleCheckBig className="h-4 w-4" />
                      {t("voucher_claimed")}
                    </>
                  ) : (
                    t("voucher_claim")
                  )}
                </Button>
              ) : (
                <Badge variant="secondary">{t(`voucher_${voucher.status}` as never)}</Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
