import type { ICartItemModel } from "@/models/cart";
import type { PaymentMethod } from "@/types/payment";
import type {
  CheckoutAddressValues,
  CheckoutPaymentOption,
} from "@/features/checkout/types/checkout";

export interface CheckoutSummaryState {
  itemCount: number;
  subTotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface CheckoutContextType {
  signedIn: boolean;
  paymentMethod: PaymentMethod;
  paymentOptions: CheckoutPaymentOption[];
  checkoutItems: ICartItemModel[];
  summary: CheckoutSummaryState;
  isSubmitting: boolean;
  isCartLoading: boolean;
  addressValues: CheckoutAddressValues;
  setPaymentMethod: (value: PaymentMethod) => void;
  setAddressValue: <K extends keyof CheckoutAddressValues>(
    key: K,
    value: CheckoutAddressValues[K],
  ) => void;
  submitOrder: () => Promise<void>;
}
