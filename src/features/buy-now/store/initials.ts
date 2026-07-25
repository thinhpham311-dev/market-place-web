import type { PaymentMethod } from "@/types/payment";
import type { CheckoutAddressValues } from "@/features/checkout/types/checkout";

export interface CheckoutStoreState {
  paymentMethod: PaymentMethod;
  isSubmitting: boolean;
  addressValues: CheckoutAddressValues;
}

export const defaultCheckoutAddressValues: CheckoutAddressValues = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
  note: "",
};

export const initialState: CheckoutStoreState = {
  paymentMethod: "cod",
  isSubmitting: false,
  addressValues: defaultCheckoutAddressValues,
};
