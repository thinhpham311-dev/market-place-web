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
    state.totalAmount = state.items.reduce((sum, item) => sum + item.sku_price * item.quantity, 0);
    state.totalAmountDiscount = state.items.reduce((sum, item) => sum + (item.sku_price || 0) * item.quantity, 0);
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

            const existingItem = state.items.find(item => item.sku_id === cartItem.sku_id);
            const updateItemTotals = (item: ICartItem) => {
                item.totalPrice = item.sku_price * item.quantity;
                item.discountedTotalPrice = item.sku_price * item.quantity;
            };

            if (existingItem) {
                existingItem.quantity += cartItem.quantity;
                updateItemTotals(existingItem);
            } else {
                const newItem = {
                    ...cartItem,
                    totalPrice: cartItem.sku_price * cartItem.quantity,
                    discountedTotalPrice: cartItem.sku_price * cartItem.quantity,
                };
                state.items.unshift(newItem);
            }

            recalculateTotals(state);
        },

        updateItem: (state, action: PayloadAction<{ sku_id: string; quantity: number }>) => {
            const { sku_id, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.sku_id === sku_id);

            if (itemToUpdate) {
                if (quantity === 0) {
                    state.items = state.items.filter(item => item.sku_id !== sku_id);
                } else {
                    const duplicateItem = state.items.find(
                        item => item.sku_id !== sku_id
                    );

                    if (duplicateItem) {
                        duplicateItem.quantity += quantity;
                        duplicateItem.totalPrice = duplicateItem.sku_price * duplicateItem.quantity;
                        duplicateItem.discountedTotalPrice = duplicateItem.sku_price * duplicateItem.quantity;
                        state.items = state.items.filter(item => item.sku_id !== sku_id);
                    } else {
                        itemToUpdate.quantity = quantity;
                        itemToUpdate.totalPrice = itemToUpdate.sku_price * quantity;
                        itemToUpdate.discountedTotalPrice = itemToUpdate.sku_price * quantity;
                    }
                }
            }

            recalculateTotals(state);
        },


        removeItem: (state, action: PayloadAction<{ sku_id: string }>) => {
            state.items = state.items.filter(item => item.sku_id !== action.payload.sku_id);
            recalculateTotals(state);
        },

        removeAllItems: (state) => {
            state.items = [];
            state.selectedItems = [];
            recalculateTotals(state);
        },

        toggleItemSelection: (state, action: PayloadAction<{ sku_id: string; checked: boolean }>) => {
            const { sku_id, checked } = action.payload;
            const selectedIndex = state.selectedItems.indexOf(sku_id);

            if (checked && selectedIndex === -1) {
                state.selectedItems.push(sku_id);
            } else if (!checked && selectedIndex !== -1) {
                state.selectedItems.splice(selectedIndex, 1);
            }
            recalculateTotals(state);
        },
        removeSelectedItems: (state) => {
            const selectedSet = new Set(state.selectedItems);
            state.items = state.items.filter(item => !selectedSet.has(item.sku_id));
            state.selectedItems = [];
            recalculateTotals(state);
        },

    },
});

export const {
    addItem,
    removeAllItems,
    removeItem,
    updateItem,
    toggleItemSelection,
    removeSelectedItems
} = cartSlice.actions;
export default cartSlice.reducer;