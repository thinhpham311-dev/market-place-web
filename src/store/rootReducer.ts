import { combineReducers, Reducer } from "redux";
import auth from "./auth";
import api from "./api";
import settings from "./settings";

export type AuthState = ReturnType<typeof auth>;
export type ApiState = ReturnType<typeof api>;
export type SettingsState = ReturnType<typeof settings>;

export type AsyncReducers = {
  [key: string]: Reducer;
};

// ✅ Các reducer tĩnh
export const staticReducers = {
  auth,
  api,
  settings,
};

// ✅ RootReducerState chuẩn xác hơn
export type RootReducerState = {
  auth: AuthState;
  api: ApiState;
  settings: SettingsState;
} & Record<string, any>;

// ✅ Hàm rootReducer nhận asyncReducers
const rootReducer = (asyncReducers: AsyncReducers = {}): Reducer<RootReducerState> => {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
};

export default rootReducer;
