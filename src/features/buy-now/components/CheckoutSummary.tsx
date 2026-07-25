"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/lib/hooks";
import { formatToCurrency } from "@/utils/formats";

interface CheckoutSummaryProps {
  itemCount: number;
  subTotal: number;
  shipping: number;
  tax: number;
  total: number;
  isSubmitting: boolean;
  disabled?: boolean;
  ctaLabel?: string;
  onSubmit: () => void;
}

export default function CheckoutSummary({
  itemCount,
  subTotal,
  shipping,
  tax,
  total,
  isSubmitting,
  disabled = false,
  ctaLabel = "",
  onSubmit,
}: CheckoutSummaryProps) {
  const { t } = useTranslation();

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>{t("checkout_order_summary")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span>
            {t("checkout_items")} ({itemCount})
          </span>
          <span>{formatToCurrency(subTotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>{t("checkout_estimated_shipping")}</span>
          <span>{formatToCurrency(shipping)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>{t("checkout_estimated_tax")}</span>
          <span>{formatToCurrency(tax)}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-semibold">
          <span>{t("cart_total")}</span>
          <span>{formatToCurrency(total)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button className="w-full" disabled={disabled || isSubmitting} onClick={onSubmit}>
          {isSubmitting ? t("checkout_placing_order") : ctaLabel || t("checkout_place_order")}
        </Button>
        <p className="text-center text-xs text-muted-foreground">{t("checkout_terms_notice")}</p>
      </CardFooter>
    </Card>
  );
}
