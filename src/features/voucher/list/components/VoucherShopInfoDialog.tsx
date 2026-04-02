"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2, MapPin, Phone, Store, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/lib/hooks";
import { formatPhone } from "@/utils/formats";
import { useFetchShopInfo } from "@/features/voucher/list/hooks/useFetchShopInfo";

interface VoucherShopInfoDialogProps {
  shopId?: string;
}

export default function VoucherShopInfoDialog({ shopId = "" }: VoucherShopInfoDialogProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { shopInfo, shopHref, loading, error } = useFetchShopInfo({
    shopId,
    enabled: open,
  });

  if (!shopId) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="sm" variant="ghost" className="h-auto px-0 text-xs text-orange-600">
          {t("voucher_shop_info")}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Store className="h-5 w-5 text-orange-600" />
            {t("voucher_shop_info")}
          </DialogTitle>
          <DialogDescription>{t("voucher_shop_info_desc")}</DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex min-h-40 items-center justify-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("voucher_shop_info_loading")}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
            {error}
          </div>
        ) : shopInfo ? (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3 rounded-2xl bg-orange-50 p-4">
              <div className="space-y-1">
                <p className="text-lg font-semibold">
                  {shopInfo.shop_name?.trim() || t("shop_name_fallback")}
                </p>
                <Badge variant="outline">{shopInfo.shop_id}</Badge>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              {shopInfo.shop_email ? (
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{t("voucher_shop_email")}</p>
                    <p className="text-muted-foreground break-all">{shopInfo.shop_email}</p>
                  </div>
                </div>
              ) : null}

              {shopInfo.shop_phone ? (
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{t("voucher_shop_phone")}</p>
                    <p className="text-muted-foreground">
                      {formatPhone({ phone: shopInfo.shop_phone })}
                    </p>
                  </div>
                </div>
              ) : null}

              {shopInfo.shop_address ? (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{t("voucher_shop_address")}</p>
                    <p className="text-muted-foreground">{shopInfo.shop_address}</p>
                  </div>
                </div>
              ) : null}
            </div>

            {shopHref ? (
              <Button asChild className="w-full">
                <Link href={shopHref}>{t("shop_view")}</Link>
              </Button>
            ) : null}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
