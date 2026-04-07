"use client";

import { useCallback, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { useShoppingCartContext } from "@/features/cart/hooks";
import type { CheckoutAddressValues, CheckoutPaymentOption } from "@/features/checkout/types/checkout";
import { useAppDispatch, useAppSelector, useTranslation } from "@/lib/hooks";
import reducer from "@/features/checkout/store";
import { injectReducer, removeReducer } from "@/store";
import { CHECKOUT_KEY } from "@/features/checkout/constants";
import { selectCheckoutByStoreKey } from "@/features/checkout/store/selectors";
import {
  resetCheckoutState,
  setCheckoutAddressValue,
  setCheckoutPaymentMethod,
  setCheckoutSubmitting,
} from "@/features/checkout/store/stateSlice";
import type { PaymentMethod } from "@/types/payment";

const CHECKOUT_SUBMIT_DELAY_MS = 700;

export function useCheckoutData() {
  const { t } = useTranslation();
  const { data, loading } = useShoppingCartContext();
  const dispatch = useAppDispatch();
  const signedIn = useAppSelector((state) => state.auth.session.signedIn);

  useEffect(() => {
    injectReducer(CHECKOUT_KEY, reducer);

    return () => {
      dispatch(resetCheckoutState());
      removeReducer(CHECKOUT_KEY);
    };
  }, [dispatch]);

  const { paymentMethod, isSubmitting, addressValues } = useAppSelector(
    selectCheckoutByStoreKey(CHECKOUT_KEY),
  );

  const paymentOptions: CheckoutPaymentOption[] = useMemo(
    () => [
      {
        label: t("checkout_payment_cod"),
        value: "cod",
        description: t("checkout_payment_cod_desc"),
      },
      {
        label: t("checkout_payment_bank_transfer"),
        value: "bank_transfer",
        description: t("checkout_payment_bank_transfer_desc"),
      },
      {
        label: t("checkout_payment_stripe"),
        value: "stripe",
        description: t("checkout_payment_stripe_desc"),
      },
    ],
    [t],
  );

  const selectedItems = data.cart_selected_items || [];
  const cartItems = data.cart_items || [];
  const checkoutItems = selectedItems.length > 0 ? selectedItems : cartItems;
  const shipping = data.cart_estimated_shipping || 0;
  const tax = data.cart_estimated_tax || 0;

  const summary = useMemo(() => {
    const itemCount = checkoutItems.reduce((total, item) => total + item.itemQuantity, 0);
    const subTotal =
      selectedItems.length > 0 && data.cart_selected_items_total
        ? data.cart_selected_items_total
        : checkoutItems.reduce(
            (total, item) => total + (item.itemTotalPrice || item.itemSkuPrice * item.itemQuantity),
            0,
          );

    return {
      itemCount,
      subTotal,
      shipping,
      tax,
      total: subTotal + shipping + tax,
    };
  }, [
    checkoutItems,
    data.cart_selected_items_total,
    selectedItems.length,
    shipping,
    tax,
  ]);

  const setAddressValue = useCallback(
    <K extends keyof CheckoutAddressValues>(key: K, value: CheckoutAddressValues[K]) => {
      dispatch(setCheckoutAddressValue({ key, value }));
    },
    [dispatch],
  );

  const setPaymentMethod = useCallback(
    (value: PaymentMethod) => {
      dispatch(setCheckoutPaymentMethod(value));
    },
    [dispatch],
  );

  const submitOrder = useCallback(async () => {
    if (!signedIn) {
      toast.error(t("checkout_sign_in_before_payment_error"));
      return;
    }

    if (checkoutItems.length === 0) {
      toast.error(t("checkout_empty_error"));
      return;
    }

    try {
      dispatch(setCheckoutSubmitting(true));
      await new Promise((resolve) => setTimeout(resolve, CHECKOUT_SUBMIT_DELAY_MS));

      const selectedPaymentLabel =
        paymentOptions.find((option) => option.value === paymentMethod)?.label ?? paymentMethod;

      toast.success(`${t("checkout_order_placed_success")} ${selectedPaymentLabel}.`);
    } finally {
      dispatch(setCheckoutSubmitting(false));
    }
  }, [checkoutItems.length, dispatch, paymentMethod, paymentOptions, signedIn, t]);

  return {
    signedIn,
    paymentMethod,
    paymentOptions,
    checkoutItems,
    summary,
    isSubmitting,
    isCartLoading: loading.actions.showList,
    addressValues,
    setPaymentMethod,
    setAddressValue,
    submitOrder,
  };
}
