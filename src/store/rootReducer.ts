import { combineReducers, Reducer } from 'redux';
import auth from './auth';


export type AuthState = ReturnType<typeof auth>;

export type AsyncReducers = {
    [key: string]: Reducer;
};

// ✅ Các reducer tĩnh
export const staticReducers = {
    auth,
};

// ✅ RootReducerState chuẩn xác hơn
export type RootReducerState = {
    auth: AuthState;
} & Record<string, any>;

// ✅ Hàm rootReducer nhận asyncReducers
const rootReducer = (asyncReducers: AsyncReducers = {}): Reducer<RootReducerState> => {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers,
    });
};


export default rootReducer;
