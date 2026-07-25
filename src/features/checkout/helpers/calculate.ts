import { ICartModel } from "@/models/cart";

const checkIsSameVariant = (a: number[], b: number[]) => {
  return a.length === b.length && a.every((v, i) => v === b[i]);
};

const calculateEstimatedShipping = (totalAmount: number): number => {
  if (totalAmount === 0) return 0;
  return totalAmount > 100 ? 0 : 10;
};

const calculateEstimatedTax = (totalAmount: number): number => {
  return totalAmount * 0.1;
};

const calculateTotal = (
  totalAmount: number,
  estimatedShipping: number,
  estimatedTax: number,
): number => {
  return totalAmount + estimatedShipping + estimatedTax;
};

const recalculateTotals = (cart: ICartModel) => {
  cart.cart_total_quantity = cart.cart_items.reduce((sum, item) => sum + item.itemQuantity, 0);
  cart.cart_sub_total = cart.cart_items.reduce(
    (sum, item) => sum + item.itemSkuPrice * item.itemQuantity,
    0,
  );
  cart.cart_sub_total = cart.cart_items.reduce(
    (sum, item) => sum + (item.itemSkuPrice || 0) * item.itemQuantity,
    0,
  );
  cart.cart_items_count = cart.cart_items.length;

  cart.cart_selected_items_count = cart.cart_selected_items?.length;
  cart.cart_selected_items_total = cart.cart_selected_items?.reduce(
    (sum, item) => sum + (item.itemSkuPrice || 0) * item.itemQuantity,
    0,
  );

  if (cart.cart_items.length === 0) {
    cart.cart_total_price = 0;
    cart.cart_estimated_shipping = 0;
    cart.cart_estimated_tax = 0;
  } else {
    const taxableAmount =
      cart.cart_total_discount > 0 ? cart.cart_total_discount : cart.cart_sub_total;

    cart.cart_estimated_shipping = calculateEstimatedShipping(cart.cart_sub_total);
    cart.cart_estimated_tax = calculateEstimatedTax(taxableAmount);
    cart.cart_total_price = calculateTotal(
      cart.cart_total_discount,
      cart.cart_estimated_shipping,
      cart.cart_estimated_tax,
    );
  }
};

export { checkIsSameVariant, recalculateTotals };
