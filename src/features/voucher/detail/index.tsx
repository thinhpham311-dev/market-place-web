"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import NotFound from "@/components/layout/notfound";
import { useAppSelector, useTranslation } from "@/lib/hooks";
import { formatToCurrency } from "@/utils/formats";
import { useFetchData } from "@/features/voucher/list/hooks/useFetchData";
import VoucherDetailHero from "@/features/voucher/detail/components/VoucherDetailHero";
import VoucherDetailLoading from "@/features/voucher/detail/components/VoucherDetailLoading";
import VoucherProductSection from "@/features/voucher/detail/components/VoucherProductSection";
import VoucherTermsCard from "@/features/voucher/detail/components/VoucherTermsCard";
import VoucherUsageCard from "@/features/voucher/detail/components/VoucherUsageCard";

export default function VoucherDetailPage() {
  const { t } = useTranslation();
  const params = useParams<{ id?: string }>();
  const searchParams = useSearchParams();
  const signedIn = useAppSelector((state) => state.auth.session.signedIn);
  const [isClaimed, setIsClaimed] = useState(false);

  const voucherId = typeof params?.id === "string" ? params.id : "";
  const shopId = searchParams.get("shopId") || "";
  const { vouchers, loading, error } = useFetchData({
    shopId,
    limit: 50,
    page: 1,
  });

  const voucher = useMemo(
    () => vouchers.find((item) => item.discountId === voucherId || item.id === voucherId) ?? null,
    [voucherId, vouchers],
  );

  const discountSummary =
    voucher?.discountType === "percentage"
      ? `${voucher.discountValue}%${
          voucher.maxDiscountAmount > 0
            ? ` (${t("voucher_max_discount")}: ${formatToCurrency(voucher.maxDiscountAmount)})`
            : ""
        }`
      : formatToCurrency(voucher?.discountValue || voucher?.discountAmount || 0);

  const handleClaim = () => {
    if (!signedIn) {
      toast.error(t("voucher_claim_sign_in"));
      return;
    }

    setIsClaimed(true);
    toast.success(t("voucher_claim_success"));
  };

  if (loading) {
    return <VoucherDetailLoading />;
  }

  if (error && !voucher) {
    return <NotFound message={error} />;
  }

  if (!voucher) {
    return <NotFound message={t("voucher_detail_not_found")} />;
  }

  return (
    <div className="container mx-auto space-y-5 px-3 py-5 md:px-6">
      <Button asChild variant="ghost" className="px-0">
        <Link href={`/user/vouchers${voucher.shopId ? `?shopId=${voucher.shopId}` : ""}`}>
          <ChevronLeft className="h-4 w-4" />
          {t("voucher_back_to_list")}
        </Link>
      </Button>

      <div className="w-full space-y-5">
        <VoucherDetailHero
          voucher={voucher}
          discountSummary={discountSummary}
          isClaimed={isClaimed}
          onClaim={handleClaim}
        />

        <div className="grid w-full gap-5 lg:grid-cols-3">
          <VoucherTermsCard voucher={voucher} discountSummary={discountSummary} />
          <VoucherUsageCard voucher={voucher} />
        </div>

        <VoucherProductSection code={voucher.code} shopId={voucher.shopId} />
      </div>
    </div>
  );
}
