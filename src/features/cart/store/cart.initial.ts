import { ICart } from '@/interfaces/cart';
interface IShoppingCart {
    loading: boolean;
    data: ICart;
    error: Error | null;
}

// initial root state
export const initialState: IShoppingCart = {
    loading: false,
    data: {
        cart_id: "",
        cart_products: [],
        cart_total_quantity: 0,
        cart_userId: "",
        cart_product_count: 0,
        cart_sub_total: 0,
        cart_total_discount: 0,
        cart_total_price: 0,
        cart_estimated_tax: 0,
        cart_selected_items: [],
        cart_selected_items_total: 0,
        cart_selected_items_count: 0,
        cart_estimated_shipping: 0,
    },
    error: null,
};
