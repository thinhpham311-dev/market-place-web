import { combineReducers, Reducer } from 'redux';
import auth from './auth';
import cart from "../features/cart/store";

export type AuthState = ReturnType<typeof auth>;
export type CartState = ReturnType<typeof cart>;

export type AsyncReducers = {
    [key: string]: Reducer;
};

export type RootReducerState = {
    auth: AuthState;
    cart: CartState;
} & {
    [key in keyof AsyncReducers]: ReturnType<AsyncReducers[key]>;
};

const rootReducer = (asyncReducers: AsyncReducers = {}): Reducer<RootReducerState> => {
    return (state, action) => {
        const combinedReducer = combineReducers({
            auth,
            cart,
            ...asyncReducers,
        });
        return combinedReducer(state, action);
    };
};

export default rootReducer;
