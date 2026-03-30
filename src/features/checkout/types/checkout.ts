import { PaymentMethod } from "@/types/payment";

export interface CheckoutAddressValues {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  note: string;
}

export interface CheckoutFieldErrors {
  [key: string]: string | undefined;
}

export interface CheckoutPaymentOption {
  label: string;
  value: PaymentMethod;
  description: string;
}
