import { combineReducers, Reducer } from "redux";
import auth from "./auth";
import api from "./api";
import settings from "./settings";
import cartCollapse from "@/features/cart/store/collapseSlice";

export type AuthState = ReturnType<typeof auth>;
export type ApiState = ReturnType<typeof api>;
export type SettingsState = ReturnType<typeof settings>;
export type CartCollapseState = ReturnType<typeof cartCollapse>;

export type AsyncReducers = {
  [key: string]: Reducer;
};

// ✅ Các reducer tĩnh
export const staticReducers = {
  auth,
  api,
  settings,
  cartCollapse,
};

// ✅ RootReducerState chuẩn xác hơn
export type RootReducerState = {
  auth: AuthState;
  api: ApiState;
  settings: SettingsState;
  cartCollapse: CartCollapseState;
} & Record<string, any>;

// ✅ Hàm rootReducer nhận asyncReducers
const rootReducer = (asyncReducers: AsyncReducers = {}): Reducer<RootReducerState> => {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
};

export default rootReducer;
