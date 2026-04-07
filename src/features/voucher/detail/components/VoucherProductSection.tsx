"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProGrid from "@/features/product/components/ProGrid";
import { useTranslation } from "@/lib/hooks";
import { useVoucherDetailContext } from "@/features/voucher/detail/hooks/useVoucherDetailContext";

export default function VoucherProductSection() {
  const { t } = useTranslation();
  const { products, productsLoading, productsError } = useVoucherDetailContext();

  return (
    <Card className="w-full border-stone-200 shadow-none">
      <CardHeader>
        <CardTitle>{t("voucher_products_title")}</CardTitle>
        <CardDescription>{t("voucher_products_desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <ProGrid
          data={products}
          isLoading={productsLoading}
          error={productsError}
          countLoadItems={12}
          className="grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4"
        />
      </CardContent>
    </Card>
  );
}
