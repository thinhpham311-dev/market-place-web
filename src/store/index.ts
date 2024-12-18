import { PERSIST_STORE_NAME } from '@/constants/app/app.constant';
import rootReducer, { RootReducerState } from './rootReducer';
import { configureStore, Middleware, Reducer } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Store } from 'redux';

interface ExtendedStore extends Store {
    asyncReducers: Record<string, Reducer>;
}

const middlewares: Middleware[] = [];

const persistConfig: PersistConfig<RootReducerState> = {
    key: PERSIST_STORE_NAME,
    keyPrefix: '',
    storage,
    whitelist: ['auth', 'product'],
};

const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer() as Reducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(middlewares),
    devTools: process.env.NODE_ENV === 'development',
}) as ExtendedStore;

store.asyncReducers = {};

export const persistor = persistStore(store);

export const injectReducer = (key: string, reducer: Reducer): typeof store | false => {
    if (store.asyncReducers[key]) {
        return false;
    }
    store.asyncReducers[key] = reducer;
    store.replaceReducer(
        persistReducer(
            persistConfig,
            rootReducer(store.asyncReducers) as Reducer
        )
    );
    persistor.persist();
    return store;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
