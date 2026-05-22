"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProGrid from "@/features/product/components/ProGrid";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslation } from "@/lib/hooks";
import { useFetchData } from "@/features/voucher/detail/hooks";

interface IVoucherProductSection {
  code: string;
  shopId: string;
}

export default function VoucherProductSection({
code, shopId
}: IVoucherProductSection) {
  const { t } = useTranslation();

  const { products, loading, error } = useFetchData({
    code, shopId
  });

  return (
    <Card className="w-full border-stone-200 shadow-none">
      <CardHeader>
        <CardTitle>{t("voucher_products_title")}</CardTitle>
        <CardDescription>{t("voucher_products_desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ProGrid
          data={products}
          isLoading={loading}
          error={error}
          countLoadItems={12}
          className="grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4"
        />
      </CardContent>
    </Card>
  );
}
