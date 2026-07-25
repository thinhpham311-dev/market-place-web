"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { CheckoutPaymentOption } from "@/features/checkout/types/checkout";
import { useTranslation } from "@/lib/hooks";
import { PaymentMethod } from "@/types/payment";
import { cn } from "@/utils/styles";

interface CheckoutPaymentProps {
  options: CheckoutPaymentOption[];
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

export default function CheckoutPayment({ options, value, onChange }: CheckoutPaymentProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">{t("checkout_payment_method")}</h2>
        <p className="text-sm text-muted-foreground">{t("checkout_payment_method_desc")}</p>
      </div>

      <div className="grid gap-3">
        {options.map((option) => {
          const isActive = value === option.value;

          return (
            <Card
              key={option.value}
              className={cn(
                "border transition-colors",
                isActive && "border-primary bg-primary/5 shadow-sm",
              )}
            >
              <CardContent className="flex items-center justify-between gap-4 p-4">
                <div className="space-y-1">
                  <p className="font-medium">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <Button
                  type="button"
                  variant={isActive ? "default" : "outline"}
                  onClick={() => onChange(option.value)}
                >
                  {isActive ? t("checkout_selected") : t("checkout_choose")}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
