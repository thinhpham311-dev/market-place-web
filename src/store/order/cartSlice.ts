import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//types
import { Icart, IcartItem } from '@/types/cart';

// Utility functions for estimated calculations
const calculateEstimatedShipping = (totalAmount: number): number => {
    // Example logic: Free shipping for orders over $100, otherwise $10
    return totalAmount > 100 ? 0 : 10;
};

const calculateEstimatedTax = (totalAmount: number): number => {
    // Example logic: 10% tax
    return totalAmount * 0.1;
};

// Recalculate the final total
const calculateTotal = (totalAmount: number, estimatedShipping: number, estimatedTax: number): number => {
    return totalAmount + estimatedShipping + estimatedTax;
};

const initialState: Icart = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    totalAmountDiscount: 0,
    totalSelectItems: 0,
    total: 0, // New field for the final total
    estimatedShipping: 0,
    estimatedTax: 0,
    selectedItems: [],
};

export const cartSlice = createSlice({
    name: 'order/cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<IcartItem>) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            state.totalQuantity += newItem.quantity;
            state.totalAmount += newItem.price * newItem.quantity;
            state.totalAmountDiscount += newItem.discountPrice * newItem.quantity;

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
            } else {
                state.items.push({ ...newItem });
            }

            // Recalculate estimated values
            state.estimatedShipping = calculateEstimatedShipping(state.totalAmount);
            state.estimatedTax = calculateEstimatedTax(state.totalAmount);
            state.total = calculateTotal(state.totalAmount, state.estimatedShipping, state.estimatedTax);
        },
        updateItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.id === id);

            if (itemToUpdate) {
                const quantityDiff = quantity - itemToUpdate.quantity;

                if (quantity === 0) {
                    // Remove the item if the quantity is zero
                    state.items = state.items.filter(item => item.id !== id);
                    state.totalQuantity -= itemToUpdate.quantity;
                    state.totalAmount -= itemToUpdate.price * itemToUpdate.quantity;
                    state.totalAmountDiscount -= itemToUpdate.discountPrice * itemToUpdate.quantity;
                } else {
                    // Update the quantity and recalculate totals
                    state.totalQuantity += quantityDiff;
                    state.totalAmount += quantityDiff * itemToUpdate.price;
                    state.totalAmountDiscount += quantityDiff * itemToUpdate.discountPrice;
                    itemToUpdate.quantity = quantity;
                }

                // Recalculate estimated values
                state.estimatedShipping = calculateEstimatedShipping(state.totalAmount);
                state.estimatedTax = calculateEstimatedTax(state.totalAmount);
                state.total = calculateTotal(state.totalAmount, state.estimatedShipping, state.estimatedTax);
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.price * existingItem.quantity;
                state.totalAmountDiscount -= existingItem.discountPrice * existingItem.quantity;
                state.items = state.items.filter(item => item.id !== id);
            }

            // Recalculate estimated values
            state.estimatedShipping = calculateEstimatedShipping(state.totalAmount);
            state.estimatedTax = calculateEstimatedTax(state.totalAmount);
            state.total = calculateTotal(state.totalAmount, state.estimatedShipping, state.estimatedTax);
        },
        removeAllItems(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
            state.totalAmountDiscount = 0;

            // Reset estimated values
            state.estimatedShipping = 0;
            state.estimatedTax = 0;
            state.total = 0; // Reset final total
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
            state.items = state.items.filter(item => !state.selectedItems.includes(item.id));
            state.selectedItems = []; // Xóa các id đã chọn sau khi xóa các mục

            // Tính toán lại các giá trị sau khi xóa
            state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
            state.totalAmount = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            state.totalAmountDiscount = state.items.reduce((sum, item) => sum + (item.discountPrice * item.quantity), 0);

            // Recalculate estimated values
            state.estimatedShipping = calculateEstimatedShipping(state.totalAmount);
            state.estimatedTax = calculateEstimatedTax(state.totalAmount);
            state.total = calculateTotal(state.totalAmount, state.estimatedShipping, state.estimatedTax);
        },
    },
});

export const { addItem, removeItem, removeAllItems, updateItemQuantity, toggleItemSelection, removeSelectedItems } = cartSlice.actions;
export default cartSlice.reducer;
