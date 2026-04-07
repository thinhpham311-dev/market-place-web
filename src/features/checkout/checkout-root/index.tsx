"use client";

import CheckoutForm from "@/features/checkout/components/CheckoutForm";
import CheckoutProvider from "@/features/checkout/providers";
import { useCheckoutData } from "@/features/checkout/hooks/useCheckoutData";

export default function CheckoutRoot() {
  const checkoutData = useCheckoutData();

  return (
    <CheckoutProvider
      contextValues={{
        signedIn: checkoutData.signedIn,
        paymentMethod: checkoutData.paymentMethod,
        paymentOptions: checkoutData.paymentOptions,
        checkoutItems: checkoutData.checkoutItems,
        summary: checkoutData.summary,
        isSubmitting: checkoutData.isSubmitting,
        isCartLoading: checkoutData.isCartLoading,
        addressValues: checkoutData.addressValues,
        setPaymentMethod: checkoutData.setPaymentMethod,
        setAddressValue: checkoutData.setAddressValue,
        submitOrder: checkoutData.submitOrder,
      }}
    >
      <CheckoutForm />
    </CheckoutProvider>
  );
}
