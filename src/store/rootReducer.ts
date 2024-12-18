import { combineReducers, Reducer } from 'redux';
import auth from './auth';
import order from "./order"

export type AuthState = ReturnType<typeof auth>;
export type OrderState = ReturnType<typeof order>;

export type AsyncReducers = {
    [key: string]: Reducer;
};

export type RootReducerState = {
    auth: AuthState;
    order: OrderState

} & {
    [key in keyof AsyncReducers]: ReturnType<AsyncReducers[key]>;
};

const rootReducer = (asyncReducers: AsyncReducers = {}): Reducer<RootReducerState> => {
    return (state, action) => {
        const combinedReducer = combineReducers({
            auth,
            order,
            ...asyncReducers,
        });
        return combinedReducer(state, action);
    };
};

export default rootReducer;
