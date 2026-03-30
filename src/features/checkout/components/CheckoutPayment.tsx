"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { CheckoutPaymentOption } from "@/features/checkout/types/checkout";
import { PaymentMethod } from "@/types/payment";
import { cn } from "@/utils/styles";

interface CheckoutPaymentProps {
  options: CheckoutPaymentOption[];
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

export default function CheckoutPayment({ options, value, onChange }: CheckoutPaymentProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Payment Method</h2>
        <p className="text-sm text-muted-foreground">
          Choose how you would like to complete this purchase.
        </p>
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
                  {isActive ? "Selected" : "Choose"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
