"use client";

import { useFetchData } from "@/features/voucher/list/hooks/useFetchData";
import VoucherListProvider from "@/features/voucher/list/providers";

interface IVoucherDetailRoot{
    children: React.ReactNode;
    shopId?: string;
    limit?: string;
    page?: string;
}

export default function VoucherDetailRoot({ children, shopId, limit, page }: IVoucherDetailRoot) {
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
  
  return (
    <VoucherListProvider
      contextValues={{
        vouchers,
        loading,
        error,
        shopId: resolvedShopId,
        claimedVoucherIds: [],
      }}
    >
        {children}
    </VoucherListProvider>
  );
}
