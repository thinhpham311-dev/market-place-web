"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
  ctaLabel = "Place Order",
  onSubmit,
}: CheckoutSummaryProps) {
  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span>Items ({itemCount})</span>
          <span>{formatToCurrency(subTotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>Estimated Shipping</span>
          <span>{formatToCurrency(shipping)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>Estimated Tax</span>
          <span>{formatToCurrency(tax)}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-semibold">
          <span>Total</span>
          <span>{formatToCurrency(total)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button className="w-full" disabled={disabled || isSubmitting} onClick={onSubmit}>
          {isSubmitting ? "Placing order..." : ctaLabel}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          By placing this order, you agree to the store terms, shipping policy, and return policy.
        </p>
      </CardFooter>
    </Card>
  );
}
