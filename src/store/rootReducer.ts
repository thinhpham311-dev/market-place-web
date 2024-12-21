import { combineReducers, Reducer } from 'redux';
import auth from './auth';
import cart from "./cart";
import product from "./product"

export type AuthState = ReturnType<typeof auth>;
export type CartState = ReturnType<typeof cart>;
export type ProductState = ReturnType<typeof product>

export type AsyncReducers = {
    [key: string]: Reducer;
};

export type RootReducerState = {
    auth: AuthState;
    cart: CartState;
    product: ProductState;
} & {
    [key in keyof AsyncReducers]: ReturnType<AsyncReducers[key]>;
};

const rootReducer = (asyncReducers: AsyncReducers = {}): Reducer<RootReducerState> => {
    return (state, action) => {
        const combinedReducer = combineReducers({
            auth,
            cart,
            product,
            ...asyncReducers,
        });
        return combinedReducer(state, action);
    };
};

export default rootReducer;
