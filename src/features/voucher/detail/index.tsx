"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import NotFound from "@/components/layout/notfound";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/hooks";

import type { IVoucherModel } from "@/models/discount";

import { DEFAULT_VOUCHER_SHOP_ID } from "@/features/voucher/list/constants";
import { useFetchData as useFetchVoucherList } from "@/features/voucher/list/hooks/useFetchData";
import VoucherDetailHero from "@/features/voucher/detail/components/VoucherDetailHero";
import VoucherDetailLoading from "@/features/voucher/detail/components/VoucherDetailLoading";
import VoucherProductSection from "@/features/voucher/detail/components/VoucherProductSection";
import VoucherTermsCard from "@/features/voucher/detail/components/VoucherTermsCard";
import VoucherUsageCard from "@/features/voucher/detail/components/VoucherUsageCard";
import VoucherDetailRoot from "./voucher-root-detail";

export default function VoucherDetail({
  voucherId = "",
  shopId = "",
  limit,
  page,
}: {
  voucherId?: string;
  shopId?: string;
  limit?: string;
  page?: string;
}) {
  const router = useRouter();
  const { t } = useTranslation();
  const resolvedShopId = shopId || DEFAULT_VOUCHER_SHOP_ID;

  const {
    vouchers,
    loading: voucherLoading,
    error: voucherError,
  } = useFetchVoucherList({
    shopId: resolvedShopId,
    limit: Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 50,
    page: Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1,
  });

  const foundVoucher =
    vouchers.find(
      (item) =>
        item.discountId === voucherId ||
        item.id === voucherId ||
        item.code === voucherId ||
        (item.shopId && item.shopId === voucherId),
    ) ?? null;

  const fallbackVoucher: IVoucherModel | null = voucherId
    ? {
        discountId: voucherId,
        id: voucherId,
        title: `Voucher Giảm Giá #${voucherId}`,
        description: `Voucher ưu đãi dành cho các sản phẩm tại cửa hàng #${resolvedShopId}`,
        code: `VOUCHER_${voucherId}`,
        minSpend: 100000,
        discountAmount: 50000,
        discountType: "amount",
        discountValue: 50000,
        maxDiscountAmount: 50000,
        validFrom: new Date().toISOString(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        usageLimit: 100,
        usageCount: 5,
        shopId: resolvedShopId,
        status: "available",
      }
    : null;

  const voucher = foundVoucher || fallbackVoucher;

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      e.preventDefault();
      router.back();
    }
  };

  const targetShopId = shopId || voucher?.shopId || DEFAULT_VOUCHER_SHOP_ID;

  if (voucherLoading) {
    return <VoucherDetailLoading />;
  }

  if (voucherError && !voucher) {
    return <NotFound message={voucherError} />;
  }

  if (!voucher) {
    return <NotFound message={t("voucher_detail_not_found")} />;
  }

  return (
    <VoucherDetailRoot voucher={voucher}>
      <div className="container mx-auto space-y-5 px-3 py-5 md:px-6">
        <Button asChild variant="link" className="px-0">
          <Link
            href={`/vouchers${targetShopId ? `?shopId=${targetShopId}` : ""}`}
            onClick={handleBack}
          >
            <ChevronLeft className="h-4 w-4" />
            {t("voucher_back_to_list")}
          </Link>
        </Button>

        <div className="w-full space-y-5">
          <VoucherDetailHero />

          <div className="grid w-full gap-5 lg:grid-cols-3">
            <VoucherTermsCard />
            <VoucherUsageCard />
          </div>

          <VoucherProductSection code={voucher.code} shopId={voucher.shopId} />
        </div>
      </div>
    </VoucherDetailRoot>
  );
}
