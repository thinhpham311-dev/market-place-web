"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CheckoutAddress from "@/features/checkout/components/CheckoutAddress";
import CheckoutCart from "@/features/checkout/components/CheckoutCart";
import CheckoutPayment from "@/features/checkout/components/CheckoutPayment";
import CheckoutSummary from "@/features/checkout/components/CheckoutSummary";
import { useTranslation } from "@/lib/hooks";
import { useCheckoutContext } from "@/features/checkout/hooks/useCheckoutContext";

export default function CheckoutForm() {
  const { t } = useTranslation();
  const {
    signedIn,
    paymentMethod,
    paymentOptions,
    checkoutItems,
    summary,
    isSubmitting,
    isCartLoading,
    addressValues,
    setPaymentMethod,
    setAddressValue,
    submitOrder,
  } = useCheckoutContext();

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-8">
        {!signedIn && (
          <Card>
            <CardContent className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold">{t("checkout_sign_in_continue")}</h2>
                <p className="text-sm text-muted-foreground">
                  {t("checkout_sign_in_continue_desc")}
                </p>
              </div>
              <Button asChild>
                <Link href="/user/sign-in">{t("checkout_go_to_sign_in")}</Link>
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
            <CheckoutAddress values={addressValues} errors={{}} onChange={setAddressValue} />
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
          disabled={isCartLoading || !signedIn}
          ctaLabel={signedIn ? t("checkout_place_order") : t("checkout_sign_in_continue")}
          onSubmit={submitOrder}
        />
      </div>
    </div>
  );
}
