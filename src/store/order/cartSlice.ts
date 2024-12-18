import { createSlice, PayloadAction } from '@reduxjs/toolkit'

//types
import { Icart, IcartItem } from '@/types/cart';

const initialState: Icart = {
    items: [], // Array to hold cart items
    totalQuantity: 0, // Total number of items in the cart
    totalAmount: 0,   // Total price of items in the cart
};

export const cartSlice = createSlice({
    name: 'order/cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<IcartItem>) => {
            const newItem = action.payload; // { id, name, price, quantity }
            const existingItem = state.items.find(item => item.id === newItem.id);

            state.totalQuantity += newItem.quantity;
            state.totalAmount += newItem.price * newItem.quantity;

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                state.items.push({
                    ...newItem,
                });
            }
        },
        removeItem(state, action: PayloadAction<number>) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.price * existingItem.quantity;
                state.items = state.items.filter((item) => item.id !== id);
            }
        },
        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
    },
})
export const { addItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer