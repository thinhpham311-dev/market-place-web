"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useAppSelector, useTranslation } from "@/lib/hooks";
import { useFetchData } from "@/features/voucher/list/hooks/useFetchData";
import VoucherListProvider from "@/features/voucher/list/providers";

interface IVoucherListRoot {
  children?: React.ReactNode;
  shopId?: string;
  limit?: string;
  page?: string;
}

export default function VoucherListRoot({ children, shopId, limit, page }: IVoucherListRoot) {
  const { t } = useTranslation();
  const signedIn = useAppSelector((state) => state.auth.session.signedIn);
  const resolvedShopId = shopId || undefined;
  const resolvedLimit = Number(limit || 50);
  const resolvedPage = Number(page || 1);
  const {
    vouchers,
    loading,
    error,
  } = useFetchData({
    shopId: resolvedShopId,
    limit: Number.isFinite(resolvedLimit) && resolvedLimit > 0 ? resolvedLimit : 50,
    page: Number.isFinite(resolvedPage) && resolvedPage > 0 ? resolvedPage : 1,
  });
  const [claimedVoucherIds, setClaimedVoucherIds] = useState<string[]>([]);

  const summary = useMemo(
    () => ({
      available: vouchers.filter((voucher) => voucher.status === "available").length,
      used: vouchers.filter((voucher) => voucher.status === "used").length,
      expired: vouchers.filter((voucher) => voucher.status === "expired").length,
    }),
    [vouchers],
  );

  const handleClaimVoucher = (voucherId: string) => {
    if (!signedIn) {
      toast.error(t("voucher_claim_sign_in"));
      return;
    }

    setClaimedVoucherIds((prev) => (prev.includes(voucherId) ? prev : [...prev, voucherId]));
    toast.success(t("voucher_claim_success"));
  };

  return (
    <VoucherListProvider
      contextValues={{
        vouchers,
        loading,
        error,
        shopId: resolvedShopId,
        summary,
        claimedVoucherIds,
        handleClaimVoucher,
      }}
    >
      {children}
    </VoucherListProvider>
  );
}
