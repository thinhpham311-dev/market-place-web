"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { useAppSelector, useTranslation } from "@/lib/hooks";
import type { TranslationKey } from "@/lib/i18n/translations";
import type { IVoucherModel } from "@/models/discount";
import { formatToCurrency } from "@/utils/formats";
import VoucherDetailProvider from "@/features/voucher/detail/providers";

interface IVoucherDetailRoot {
  children: React.ReactNode;
  voucher: IVoucherModel;
}

function formatDiscountSummary(voucher: IVoucherModel, t: (key: TranslationKey) => string) {
  if (voucher.discountType === "percentage") {
    const maxPart =
      voucher.maxDiscountAmount > 0
        ? ` (${t("voucher_max_discount")}: ${formatToCurrency(voucher.maxDiscountAmount)})`
        : "";

    return `${voucher.discountValue}%${maxPart}`;
  }

  return formatToCurrency(voucher.discountValue || voucher.discountAmount);
}

export default function VoucherDetailRoot({ children, voucher }: IVoucherDetailRoot) {
  const { t } = useTranslation();
  const signedIn = useAppSelector((state) => state.auth.session.signedIn);
  const [claimedVoucherIds, setClaimedVoucherIds] = useState<string[]>([]);

  const discountSummary = useMemo(() => formatDiscountSummary(voucher, t), [voucher, t]);
  const isClaimed = claimedVoucherIds.includes(voucher.discountId);

  const onClaim = () => {
    if (!signedIn) {
      toast.error(t("voucher_claim_sign_in"));
      return;
    }

    setClaimedVoucherIds((prev) =>
      prev.includes(voucher.discountId) ? prev : [...prev, voucher.discountId],
    );
    toast.success(t("voucher_claim_success"));
  };

  return (
    <VoucherDetailProvider
      contextValues={{
        voucher,
        discountSummary,
        isClaimed,
        onClaim,
      }}
    >
      {children}
    </VoucherDetailProvider>
  );
}
