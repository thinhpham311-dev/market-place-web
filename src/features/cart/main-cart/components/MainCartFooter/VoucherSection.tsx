"use client";

import { Button } from "@/components/ui/button";
import { Tickets, ChevronRight } from "lucide-react";
import { useTranslation } from "@/lib/hooks";

export default function VoucherSection() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between w-full border px-3 py-2">
      <strong className="inline-flex items-center gap-4">
        <Tickets />
        <span className="text-md">{t("cart_voucher_code")}:</span>
      </strong>
      <Button variant="ghost" size="sm">
        {t("see_more")}
        <ChevronRight />
      </Button>
    </div>
  );
}
