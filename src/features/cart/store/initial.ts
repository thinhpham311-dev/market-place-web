import { ICart } from "@/interfaces/cart"
export interface IShoppingCart {
    loading: boolean;
    data: ICart;
    error: Error | null;
}
export interface IState {
    [storeKey: string]: IShoppingCart;
}

// default value for a single store
export const createDefault = (): IShoppingCart => ({
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
});


export const ensureStoreKeyState = (state: any, storeKey: string) => {
    if (!state[storeKey]) {
        state[storeKey] = createDefault();
    }
};


// initial root state
export const initialState: IState = {};
