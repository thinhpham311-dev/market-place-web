import { combineReducers, Reducer } from 'redux';
import auth from './auth';
import api from './api';


export type AuthState = ReturnType<typeof auth>;
export type ApiState = ReturnType<typeof api>;

export type AsyncReducers = {
    [key: string]: Reducer;
};

// ✅ Các reducer tĩnh
export const staticReducers = {
    auth,
    api
};

// ✅ RootReducerState chuẩn xác hơn
export type RootReducerState = {
    auth: AuthState;
    api: ApiState;
} & Record<string, any>;

// ✅ Hàm rootReducer nhận asyncReducers
const rootReducer = (asyncReducers: AsyncReducers = {}): Reducer<RootReducerState> => {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers,
    });
};


export default rootReducer;
