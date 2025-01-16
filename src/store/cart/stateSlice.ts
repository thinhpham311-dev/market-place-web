import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// types
import { Icart, IcartItem } from '@/types/cart';
import { IOption } from '@/types/product';
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
            const newItem = { ...action.payload.cartItem };
            const { options } = action.payload;
            const optionsType = options as WritableDraft<{
                label: string;
                value: IOption[];
            }>[] | undefined;
            const existingItem = state.items.find(item =>
                item.uniqueKey === newItem.uniqueKey
            );

            if (existingItem) {
                existingItem.quantity += newItem.quantity;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
                existingItem.discountedTotalPrice = existingItem.discountPrice * existingItem.quantity;
            } else {
                state.items.unshift({
                    ...newItem,
                    uniqueKey: newItem.uniqueKey,
                    options: optionsType,
                    totalPrice: newItem.price * newItem.quantity,
                    discountedTotalPrice: newItem.discountPrice * newItem.quantity,
                });
            }

            recalculateTotals(state);
        },

        updateItem: (state, action: PayloadAction<{ uniqueKey: string; options: (IOption | null)[]; quantity: number }>) => {
            const { uniqueKey, options, quantity } = action.payload;

            // Tìm item gốc cần cập nhật
            const itemToUpdate = state.items.find(item => item.uniqueKey === uniqueKey);

            if (!itemToUpdate) {
                return;
            } // Nếu không tìm thấy item, không làm gì cả

            // Tạo `uniqueKey` mới từ options (nếu có)
            const newOptionsKey = options.map(option => option ? `${option.label}-${option.value}` : "").join("|");
            const updatedUniqueKey = `${itemToUpdate._id}-${newOptionsKey}`;

            // Kiểm tra nếu item trùng với `uniqueKey` mới này, nếu có thì gộp số lượng
            const existingItem = state.items.find(item => item.uniqueKey === updatedUniqueKey);

            if (existingItem) {
                // Gộp số lượng của item trùng
                existingItem.uniqueKey = updatedUniqueKey;
                existingItem.quantity += quantity;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
                existingItem.discountedTotalPrice = existingItem.discountPrice * existingItem.quantity;

                // Xóa item cũ nếu đã gộp xong
                state.items = state.items.filter(item => item.uniqueKey !== uniqueKey);
                state.items = [...state.items];

            } else {
                // Nếu không trùng, cập nhật item
                itemToUpdate.options = options as WritableDraft<{
                    label: string;
                    value: IOption[];
                }>[];
                itemToUpdate.uniqueKey = updatedUniqueKey;
                itemToUpdate.quantity = quantity;
                itemToUpdate.totalPrice = itemToUpdate.price * quantity;
                itemToUpdate.discountedTotalPrice = itemToUpdate.discountPrice * quantity;
            }

            // Tính toán lại tổng sau khi cập nhật
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
            if (checked && !state.selectedItems.includes(uniqueKey)) {
                state.selectedItems.unshift(uniqueKey);
            } else if (!checked) {
                state.selectedItems = state.selectedItems.filter(id => id !== uniqueKey);
            }
            recalculateTotals(state);
        },
        removeSelectedItems: (state) => {
            const selectedSet = new Set(state.selectedItems);
            const remainingItems = state.items.filter(item => !selectedSet.has(item.uniqueKey));
            state.items = remainingItems
            state.selectedItems = [];
            recalculateTotals(state);
        },

    },
});

export const {
    addItem,
    removeAllItems,
    // removeItem,
    updateItem,
    toggleItemSelection,
    removeSelectedItems
} = cartSlice.actions;
export default cartSlice.reducer;