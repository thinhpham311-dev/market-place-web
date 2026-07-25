import { useContextSafe } from "@/lib/hooks/use-context-safe";
import { CheckoutContext } from "@/features/checkout/providers";

export function useCheckoutContext() {
  return useContextSafe(CheckoutContext, "CheckoutProvider");
}
