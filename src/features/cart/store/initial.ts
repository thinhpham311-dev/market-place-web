import { IShoppingCart, IState } from "@/features/cart/types";

/* ---------- Default creators ---------- */
const createDefaultLoading = () => ({
    global: false,
    byItem: {},
    actions: {
        showList: false,
        createItem: false,
        deleteItemsSelected: false,
        deleteItemsAll: false,
    },
});

const createDefaultError = () => ({
    global: null,
    byItem: {},
    actions: {
        showList: null,
        createItem: null,
        deleteItemsSelected: null,
        deleteItemsAll: null,
    },
});

const createDefaultData = () => ({
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
});

/* ---------- Export ---------- */
export const createDefault = (): IShoppingCart => ({
    loading: createDefaultLoading(),
    data: createDefaultData(),
    error: createDefaultError(),
});

export const initialState: IState = {};
