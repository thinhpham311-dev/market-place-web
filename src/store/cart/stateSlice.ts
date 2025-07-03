import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { Icart, IcartItem } from '@/interfaces/cart';
import { IOption } from '@/interfaces/product';
import { WritableDraft } from 'immer';


// Utility functions for estimated calculations
const calculateEstimatedShipping = (totalAmount: number): number => {
    if (totalAmount === 0) {
        return 0; // No shipping cost when the total amount is 0
    }
    return totalAmount > 100 ? 0 : 10;
};


const calculateEstimatedTax = (totalAmount: number): number => {
    return totalAmount * 0.1;
};

const calculateTotal = (totalAmount: number, estimatedShipping: number, estimatedTax: number): number => {
    return totalAmount + estimatedShipping + estimatedTax;
};

const initialState: Icart = {
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


const recalculateTotals = (state: Icart) => {
    state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
    state.totalAmount = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    state.totalAmountDiscount = state.items.reduce((sum, item) => sum + (item.discountPrice || 0) * item.quantity, 0);
    state.totalSelectItems = state.selectedItems.length;

    if (state.items.length === 0) {
        // Reset totals and estimated values if no items in cart
        state.total = 0;
        state.estimatedShipping = 0;
        state.estimatedTax = 0;
    } else {
        // Use totalAmountDiscount for tax calculation if it exists and is greater than 0
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
        addItem: (state, action: PayloadAction<{ cartItem: IcartItem; options: (IOption | null)[] }>) => {
            const { cartItem, options } = action.payload;
            const optionsType = options as WritableDraft<{
                label: string;
                value: IOption[];
            }>[] | undefined;

            const existingItem = state.items.find(item => item.uniqueKey === cartItem.uniqueKey);

            const updateItemTotals = (item: IcartItem) => {
                item.totalPrice = item.price * item.quantity;
                item.discountedTotalPrice = item.discountPrice * item.quantity;
            };

            if (existingItem) {
                existingItem.quantity += cartItem.quantity;
                updateItemTotals(existingItem);
            } else {
                const newItem = {
                    ...cartItem,
                    options: optionsType,
                    totalPrice: cartItem.price * cartItem.quantity,
                    discountedTotalPrice: cartItem.discountPrice * cartItem.quantity,
                };
                state.items.unshift(newItem);
            }

            recalculateTotals(state);
        },

        updateItem: (state, action: PayloadAction<{ uniqueKey: string; options: (IOption | null)[]; quantity: number }>) => {
            const { uniqueKey, options, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.uniqueKey === uniqueKey);
            const optionsType = options as WritableDraft<{ label: string; value: IOption[]; }>[] | undefined;

            if (itemToUpdate) {
                if (quantity === 0) {
                    state.items = state.items.filter(item => item.uniqueKey !== uniqueKey);
                } else {
                    const duplicateItem = state.items.find(
                        item => item.uniqueKey !== uniqueKey && JSON.stringify(item.options) === JSON.stringify(optionsType)
                    );

                    if (duplicateItem) {
                        duplicateItem.quantity += quantity;
                        duplicateItem.totalPrice = duplicateItem.price * duplicateItem.quantity;
                        duplicateItem.discountedTotalPrice = duplicateItem.discountPrice * duplicateItem.quantity;
                        state.items = state.items.filter(item => item.uniqueKey !== uniqueKey);
                    } else {
                        itemToUpdate.options = optionsType;
                        itemToUpdate.quantity = quantity;
                        itemToUpdate.totalPrice = itemToUpdate.price * quantity;
                        itemToUpdate.discountedTotalPrice = itemToUpdate.discountPrice * quantity;
                    }
                }
            }

            recalculateTotals(state);
        },


        removeItem: (state, action: PayloadAction<{ uniqueKey: string }>) => {
            state.items = state.items.filter(item => item.uniqueKey !== action.payload.uniqueKey);
            recalculateTotals(state);
        },

        removeAllItems: (state) => {
            state.items = [];
            state.selectedItems = [];
            recalculateTotals(state);
        },

        toggleItemSelection: (state, action: PayloadAction<{ uniqueKey: string; checked: boolean }>) => {
            const { uniqueKey, checked } = action.payload;
            const selectedIndex = state.selectedItems.indexOf(uniqueKey);

            if (checked && selectedIndex === -1) {
                state.selectedItems.push(uniqueKey);
            } else if (!checked && selectedIndex !== -1) {
                state.selectedItems.splice(selectedIndex, 1);
            }
            recalculateTotals(state);
        },
        removeSelectedItems: (state) => {
            const selectedSet = new Set(state.selectedItems);
            state.items = state.items.filter(item => !selectedSet.has(item.uniqueKey));
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