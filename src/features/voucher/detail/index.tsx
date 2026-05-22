"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

import NotFound from "@/components/layout/notfound";
import { Button } from "@/components/ui/button";
import { useAppSelector, useTranslation } from "@/lib/hooks";

import { useFetchData as useFetchVoucherList } from "@/features/voucher/list/hooks/useFetchData";
import VoucherDetailHero from "@/features/voucher/detail/components/VoucherDetailHero";
import VoucherDetailLoading from "@/features/voucher/detail/components/VoucherDetailLoading";
import VoucherProductSection from "@/features/voucher/detail/components/VoucherProductSection";
import VoucherTermsCard from "@/features/voucher/detail/components/VoucherTermsCard";
import VoucherUsageCard from "@/features/voucher/detail/components/VoucherUsageCard";
import VoucherDetailRoot from "./voucher-root-detail";

export default function VoucherDetail() {
  const { t } = useTranslation();
  const params = useParams<{ id?: string }>();
  const searchParams = useSearchParams();

  const voucherId = typeof params?.id === "string" ? params.id : "";
  const shopId = searchParams.get("shopId") || "";

  const {
    vouchers,
    loading: voucherLoading,
    error: voucherError,
  } = useFetchVoucherList({
    shopId,
    limit: 50,
    page: 1,
  });

  const voucher = useMemo(
    () => vouchers.find((item) => item.discountId === voucherId || item.id === voucherId) ?? null,
    [voucherId, vouchers],
  );


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
    <VoucherDetailRoot>
    <div className="container mx-auto space-y-5 px-3 py-5 md:px-6">
      <Button asChild variant="ghost" className="px-0">
        <Link href={`/user/vouchers${voucher.shopId ? `?shopId=${voucher.shopId}` : ""}`}>
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

          <VoucherProductSection 
            code={voucher.code}
            shopId={voucher.shopId}
          />
        </div>
    </div>
    </VoucherDetailRoot>
  );
}
