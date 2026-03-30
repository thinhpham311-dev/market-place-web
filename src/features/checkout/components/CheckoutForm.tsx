"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useShoppingCartContext } from "@/features/cart/hooks";
import CheckoutCart from "@/features/checkout/components/CheckoutCart";
import CheckoutPayment from "@/features/checkout/components/CheckoutPayment";
import CheckoutSummary from "@/features/checkout/components/CheckoutSummary";
import { CheckoutPaymentOption } from "@/features/checkout/types/checkout";
import { PaymentMethod } from "@/types/payment";

const paymentOptions: CheckoutPaymentOption[] = [
  {
    label: "Cash on Delivery",
    value: "cod",
    description: "Pay when your order arrives at the delivery address.",
  },
  {
    label: "Bank Transfer",
    value: "bank_transfer",
    description: "Transfer the payment after placing the order.",
  },
  {
    label: "Stripe",
    value: "stripe",
    description: "Pay securely with your debit or credit card.",
  },
];

export default function CheckoutForm() {
  const { data, loading } = useShoppingCartContext();
  const { signedIn } = useSelector(
    (state: { auth: { session: { signedIn: boolean } } }) => state.auth.session,
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkoutItems = useMemo(() => {
    if (data.cart_selected_items?.length) {
      return data.cart_selected_items;
    }

    return data.cart_items || [];
  }, [data.cart_items, data.cart_selected_items]);

  const summary = useMemo(() => {
    const itemCount = checkoutItems.reduce((total, item) => total + item.itemQuantity, 0);
    const subTotal =
      data.cart_selected_items?.length && data.cart_selected_items_total
        ? data.cart_selected_items_total
        : checkoutItems.reduce(
            (total, item) => total + (item.itemTotalPrice || item.itemSkuPrice * item.itemQuantity),
            0,
          );

    const shipping = data.cart_estimated_shipping || 0;
    const tax = data.cart_estimated_tax || 0;

    return {
      itemCount,
      subTotal,
      shipping,
      tax,
      total: subTotal + shipping + tax,
    };
  }, [checkoutItems, data.cart_estimated_shipping, data.cart_estimated_tax, data.cart_selected_items?.length, data.cart_selected_items_total]);

  const handleSubmit = async () => {
    if (!signedIn) {
      toast.error("Please sign in before continuing to payment.");
      return;
    }

    if (checkoutItems.length === 0) {
      toast.error("Your checkout is empty. Please add items from the cart first.");
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 700));

      toast.success(`Order placed successfully with ${paymentMethod.replace("_", " ")}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-8">
        {!signedIn && (
          <Card>
            <CardContent className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">Sign in to continue</h2>
                <p className="text-sm text-muted-foreground">
                  You need to be logged in before you can continue to payment.
                </p>
              </div>
              <Button asChild>
                <Link href="/user/sign-in">Go to Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-6">
            <CheckoutPayment
              options={paymentOptions}
              value={paymentMethod}
              onChange={setPaymentMethod}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <CheckoutCart items={checkoutItems} />
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-4">
        <CheckoutSummary
          itemCount={summary.itemCount}
          subTotal={summary.subTotal}
          shipping={summary.shipping}
          tax={summary.tax}
          total={summary.total}
          isSubmitting={isSubmitting}
          disabled={loading.actions.showList || !signedIn}
          ctaLabel={signedIn ? "Place Order" : "Sign in to continue"}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
