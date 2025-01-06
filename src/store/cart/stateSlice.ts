import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { Icart, IcartItem } from '@/types/cart';
import { IOption } from '@/types/product';

// Utility functions for estimated calculations
const calculateEstimatedShipping = (totalAmount: number): number => {
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

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<IcartItem>) => {
            const newItem = action.payload;
            const existingItem = state.items.find(
                item =>
                    item._id === newItem._id &&
                    JSON.stringify(item.options) === JSON.stringify(newItem.options)
            );

            state.totalQuantity += newItem.quantity;
            state.totalAmount += newItem.price * newItem.quantity;
            state.totalAmountDiscount += newItem.discountPrice * newItem.quantity;

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
                existingItem.discountedTotalPrice = existingItem.discountPrice * existingItem.quantity;
            } else {
                state.items.push({
                    ...newItem,
                    totalPrice: newItem.price * newItem.quantity,
                    discountedTotalPrice: newItem.discountPrice * newItem.quantity,
                });
            }

            state.estimatedShipping = calculateEstimatedShipping(state.totalAmount);
            state.estimatedTax = calculateEstimatedTax(state.totalAmount);
            state.total = calculateTotal(state.totalAmountDiscount, state.estimatedShipping, state.estimatedTax);
        },
        updateItemQuantity: (state, action: PayloadAction<{ id: string; options: IOption[]; quantity: number }>) => {
            const { id, options, quantity } = action.payload;
            const itemToUpdate = state.items.find(
                item =>
                    item._id === id &&
                    JSON.stringify(item.options) === JSON.stringify(options)
            );

            if (itemToUpdate) {
                const quantityDiff = quantity - itemToUpdate.quantity;

                if (quantity === 0) {
                    state.items = state.items.filter(
                        item =>
                            item._id !== id ||
                            JSON.stringify(item.options) !== JSON.stringify(options)
                    );
                    state.totalQuantity -= itemToUpdate.quantity;
                    state.totalAmount -= itemToUpdate.price * itemToUpdate.quantity;
                    state.totalAmountDiscount -= itemToUpdate.discountPrice * itemToUpdate.quantity;
                } else {
                    state.totalQuantity += quantityDiff;
                    state.totalAmount += quantityDiff * itemToUpdate.price;
                    state.totalAmountDiscount += quantityDiff * itemToUpdate.discountPrice;
                    itemToUpdate.quantity = quantity;
                    itemToUpdate.totalPrice = itemToUpdate.price * quantity;
                    itemToUpdate.discountedTotalPrice = itemToUpdate.discountPrice * quantity;
                }

                state.estimatedShipping = calculateEstimatedShipping(state.totalAmount);
                state.estimatedTax = calculateEstimatedTax(state.totalAmount);
                state.total = calculateTotal(state.totalAmountDiscount, state.estimatedShipping, state.estimatedTax);
            }
        },
        removeItem: (state, action: PayloadAction<{ id: string; options: IOption[] }>) => {
            const { id, options } = action.payload;
            const existingItem = state.items.find(
                item =>
                    item._id === id &&
                    JSON.stringify(item.options) === JSON.stringify(options)
            );

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.price * existingItem.quantity;
                state.totalAmountDiscount -= existingItem.discountPrice * existingItem.quantity;
                state.items = state.items.filter(
                    item =>
                        item._id !== id ||
                        JSON.stringify(item.options) !== JSON.stringify(options)
                );
            }

            state.estimatedShipping = calculateEstimatedShipping(state.totalAmount);
            state.estimatedTax = calculateEstimatedTax(state.totalAmount);
            state.total = calculateTotal(state.totalAmountDiscount, state.estimatedShipping, state.estimatedTax);
        },
        removeAllItems: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
            state.totalAmountDiscount = 0;
            state.estimatedShipping = 0;
            state.estimatedTax = 0;
            state.total = 0;
        },
        toggleItemSelection: (state, action: PayloadAction<{ id: string; checked: boolean }>) => {
            const { id, checked } = action.payload;
            if (checked && !state.selectedItems.includes(id)) {
                state.selectedItems.push(id);
            } else if (!checked) {
                state.selectedItems = state.selectedItems.filter(itemId => itemId !== id);
            }
        },
        removeSelectedItems: (state) => {
            state.items = state.items.filter(item => !state.selectedItems.includes(item._id));
            state.selectedItems = [];

            // Recalculate totals
            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalAmount = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            state.totalAmountDiscount = state.items.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);

            state.estimatedShipping = calculateEstimatedShipping(state.totalAmount);
            state.estimatedTax = calculateEstimatedTax(state.totalAmount);
            state.total = calculateTotal(state.totalAmountDiscount, state.estimatedShipping, state.estimatedTax);
        },
    },
});

export const { addItem, removeItem, removeAllItems, updateItemQuantity, toggleItemSelection, removeSelectedItems } = cartSlice.actions;
export default cartSlice.reducer;