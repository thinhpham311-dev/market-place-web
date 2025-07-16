import { combineReducers, Reducer } from 'redux';
import auth from './auth';
import cart from '../features/cart/store';

export type AuthState = ReturnType<typeof auth>;
export type CartState = ReturnType<typeof cart>;

export type AsyncReducers = {
    [key: string]: Reducer;
};

// ✅ Các reducer tĩnh
export const staticReducers = {
    auth,
    cart,
};

// ✅ RootReducerState chuẩn xác hơn
export type RootReducerState = {
    auth: AuthState;
    cart: CartState;
} & Record<string, any>;

// ✅ Hàm rootReducer nhận asyncReducers
const rootReducer = (asyncReducers: AsyncReducers = {}): Reducer<RootReducerState> => {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers,
    });
};


export default rootReducer;
