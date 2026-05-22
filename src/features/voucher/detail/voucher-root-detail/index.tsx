"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useAppSelector, useTranslation } from "@/lib/hooks";
import { useFetchData } from "@/features/voucher/list/hooks/useFetchData";
import VoucherListProvider from "@/features/voucher/list/providers";

interface IVoucherDetailRoot{
    children: React.ReactNode
}

export default function VoucherDetailRoot({children}: IVoucherDetailRoot) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const signedIn = useAppSelector((state) => state.auth.session.signedIn);
  const shopId = searchParams.get("shopId") || undefined;
  const limit = Number(searchParams.get("limit") || 50);
  const page = Number(searchParams.get("page") || 1);
  const {
    vouchers,
    loading,
    error,
    shopId: resolvedShopId,
  } = useFetchData({
    shopId,
    limit: Number.isFinite(limit) && limit > 0 ? limit : 50,
    page: Number.isFinite(page) && page > 0 ? page : 1,
  });
  const [claimedVoucherIds, setClaimedVoucherIds] = useState<string[]>([]);

  
  return (
    <VoucherListProvider
      contextValues={{
        vouchers,
        loading,
        error,
        shopId: resolvedShopId,
        claimedVoucherIds,
      }}
    >
        {children}
    </VoucherListProvider>
  );
}
