import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { ICart, ICartItem } from '@/interfaces/cart';


const calculateEstimatedShipping = (totalAmount: number): number => {
    if (totalAmount === 0) {
        return 0;
    }
    return totalAmount > 100 ? 0 : 10;
};


const calculateEstimatedTax = (totalAmount: number): number => {
    return totalAmount * 0.1;
};

const calculateTotal = (totalAmount: number, estimatedShipping: number, estimatedTax: number): number => {
    return totalAmount + estimatedShipping + estimatedTax;
};

const initialState: ICart = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    totalAmountDiscount: 0,
    totalSelectItems: 0,
    total: 0,
    estimatedShipping: 0,
    estimatedTax: 0,
    selectedItems: [],
};


const recalculateTotals = (state: ICart) => {
    state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
    state.totalAmount = state.items.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0);
    state.totalAmountDiscount = state.items.reduce((sum, item) => sum + (item.itemPrice || 0) * item.quantity, 0);
    state.totalSelectItems = state.selectedItems.length;

    if (state.items.length === 0) {
        state.total = 0;
        state.estimatedShipping = 0;
        state.estimatedTax = 0;
    } else {
        const taxableAmount = state.totalAmountDiscount > 0 ? state.totalAmountDiscount : state.totalAmount;

        state.estimatedShipping = calculateEstimatedShipping(state.totalAmount);
        state.estimatedTax = calculateEstimatedTax(taxableAmount);
        state.total = calculateTotal(state.totalAmountDiscount, state.estimatedShipping, state.estimatedTax);
    }
};




export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<{ cartItem: ICartItem }>) => {
            const { cartItem } = action.payload;
            const existingItem = state.items.find(item => item.itemId === cartItem.itemId);

            if (existingItem) {
                existingItem.quantity += cartItem.quantity;
            } else {
                const newItem = {
                    ...cartItem,
                    totalPrice: cartItem.itemPrice * cartItem.quantity,
                    discountedTotalPrice: cartItem.itemPrice * cartItem.quantity,
                };
                state.items.unshift(newItem);
            }
            recalculateTotals(state);
        },

        updateItem: (state, action: PayloadAction<{ itemId: string; quantity: number }>) => {
            const { itemId, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.itemId === itemId);

            if (itemToUpdate) {
                if (quantity === 0) {
                    state.items = state.items.filter(item => item.itemId !== itemId);
                } else {
                    const duplicateItem = state.items.find(
                        item => item.itemId !== itemId
                    );

                    if (duplicateItem) {
                        duplicateItem.quantity += quantity;
                        state.items = state.items.filter(item => item.itemId !== itemId);
                    } else {
                        itemToUpdate.quantity = quantity;
                    }
                }
            }

            recalculateTotals(state);
        },


        removeItem: (state, action: PayloadAction<{ itemId: string }>) => {
            state.items = state.items.filter(item => item.itemId !== action.payload.itemId);
            recalculateTotals(state);
        },

        removeAllItems: (state) => {
            state.items = [];
            state.selectedItems = [];
            recalculateTotals(state);
        },
        removeSelectedItems: (
            state,
            action: PayloadAction<{ items: ICartItem[] }>
        ) => {
            const selectedSet = new Set(action.payload.items.map(item => item.itemId))
            state.items = state.items.filter(item => !selectedSet.has(item.itemId))
            state.selectedItems = []
            recalculateTotals(state)
        },

    },
});

export const {
    addItem,
    removeAllItems,
    removeItem,
    updateItem,
    removeSelectedItems
} = cartSlice.actions;
export default cartSlice.reducer;