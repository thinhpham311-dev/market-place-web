"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProGrid from "@/features/product/components/ProGrid";
import { useTranslation } from "@/lib/hooks";
import { useFetchVoucherProducts } from "@/features/voucher/detail/hooks/useFetchVoucherProducts";

interface VoucherProductSectionProps {
  code?: string;
  shopId?: string;
}

export default function VoucherProductSection({
  code = "",
  shopId = "",
}: VoucherProductSectionProps) {
  const { t } = useTranslation();
  const { products, loading, error } = useFetchVoucherProducts({
    code,
    shopId,
    limit: 12,
    page: 1,
  });

  if (!code) {
    return null;
  }

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
