"use client";
import { useLayoutEffect, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    setPrice,
    setFlashSalePrice,
    setDefaultPrice,
    setLoading,
    setError,
    resetPrice,
} from "@/features/common/price-display/store/stateSlice";

import { selectPriceDisplayByStoreKey } from "@/features/common/price-display/store/selectors"
import { injectReducer, removeReducer } from "@/store";
import reducer from "@/features/common/price-display/store"
import { PRICE_DISPLAY } from "@/features/common/price-display/constants"

interface IUseHandlePriceDisplay {
    storeKey: string;
    initialValue?: {
        currentPrice?: number;
        flashSalePrice?: number;
        defaultPrice?: number;
        loading?: boolean;
        error?: string | { message?: string } | null;
    };
}

export function useHandlePriceDisplay({ storeKey, initialValue }: IUseHandlePriceDisplay) {
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        const reducerKey = `${PRICE_DISPLAY}_${storeKey}`;
        injectReducer(reducerKey, reducer);

        return () => {
            dispatch(resetPrice())
            removeReducer(reducerKey);
        };
    }, [storeKey, dispatch]);

    useEffect(() => {
        if (initialValue) {
            if (initialValue.currentPrice !== undefined) dispatch(setPrice(initialValue.currentPrice));
            if (initialValue.flashSalePrice !== undefined) dispatch(setFlashSalePrice(initialValue.flashSalePrice));
            if (initialValue.defaultPrice !== undefined) dispatch(setDefaultPrice(initialValue.defaultPrice));
            if (initialValue.loading !== undefined) dispatch(setLoading(initialValue.loading));
            if (initialValue.error !== undefined) dispatch(setError(initialValue.error));
        }

    }, [dispatch, initialValue]);

    const price = useAppSelector(selectPriceDisplayByStoreKey(storeKey));

    return {
        ...price,
        setPrice: (val: number) => dispatch(setPrice(val)),
        setFlashSalePrice: (val?: number) => dispatch(setFlashSalePrice(val)),
        setDefaultPrice: (val?: number) => dispatch(setDefaultPrice(val)),
        setLoading: (val: boolean) => dispatch(setLoading(val)),
        setError: (err: string | { message?: string } | null) => dispatch(setError(err)),
        resetPrice: () => dispatch(resetPrice()),
    };
}
