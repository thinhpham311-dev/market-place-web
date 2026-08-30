import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartCollapseState {
  collapsedShops: Record<string, boolean>;
}

const initialState: ICartCollapseState = {
  collapsedShops: {},
};

export const cartCollapseSlice = createSlice({
  name: "cartCollapse",
  initialState,
  reducers: {
    toggleShopCollapse: (state, action: PayloadAction<string>) => {
      const shopId = action.payload;
      const current = state.collapsedShops[shopId] ?? true;
      state.collapsedShops[shopId] = !current;
    },
    setShopCollapse: (state, action: PayloadAction<{ shopId: string; isOpen: boolean }>) => {
      const { shopId, isOpen } = action.payload;
      state.collapsedShops[shopId] = isOpen;
    },
  },
});

export const { toggleShopCollapse, setShopCollapse } = cartCollapseSlice.actions;

export default cartCollapseSlice.reducer;
