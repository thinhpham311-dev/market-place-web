import { combineReducers, Reducer, AnyAction } from 'redux';
import auth from './auth';

export type AuthState = ReturnType<typeof auth>;

export type AsyncReducers = {
    [key: string]: Reducer<any, AnyAction>;
};

export type RootReducerState = {
    auth: AuthState;
} & {
    [key in keyof AsyncReducers]: ReturnType<AsyncReducers[key]>;
};

const rootReducer = (asyncReducers: AsyncReducers = {}): Reducer<RootReducerState> => {
    return (state, action) => {
        const combinedReducer = combineReducers({
            auth,
            ...asyncReducers,
        });
        return combinedReducer(state, action);
    };
};

export default rootReducer;
