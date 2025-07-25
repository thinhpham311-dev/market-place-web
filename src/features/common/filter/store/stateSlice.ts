import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Filter } from "@/features/common/filter/types";

// ✅ Định nghĩa lại state slice
interface IFilterState {
    data: Filter[]; // danh sách options tĩnh (VD: [{ key: "category", type:"checkbox", items:[...] }])
    filters: Record<string, any>; // state user đã chọn (key: giá trị user chọn)
}

const initialState: IFilterState = {
    data: [],
    filters: {},
};

const filterSlice = createSlice({
    name: "filter/state",
    initialState,
    reducers: {
        // ✅ Gán toàn bộ data options (thường lấy từ API)
        initialFilter(state, action: PayloadAction<Filter[]>) {
            state.data = action.payload;
        },

        // ✅ User chọn filter
        setFilter(state, action: PayloadAction<{ key: string; value: any }>) {
            state.filters[action.payload.key] = action.payload.value;
        },

        // ✅ Xóa 1 filter cụ thể
        resetFilter(state, action: PayloadAction<string>) {
            delete state.filters[action.payload];
        },

        // ✅ Reset toàn bộ filter user đã chọn, KHÔNG xóa data tĩnh
        resetAllFilters(state) {
            state.filters = {};
        },
    },
});

export const { initialFilter, setFilter, resetFilter, resetAllFilters } =
    filterSlice.actions;
export default filterSlice.reducer;
