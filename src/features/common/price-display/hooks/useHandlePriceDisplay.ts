"use client";

import { useLayoutEffect, useEffect, useMemo } from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
    setInitialState,
    setPrice,
    setFlashSalePrice,
    setDefaultPrice,
    resetPrice,
} from "@/features/common/price-display/store/stateSlice";
import { IPriceDisplay } from "@/features/common/price-display/store/initial";

import { useGetPriceValue } from "@/features/common/price-display/hooks/useGetPriceValue";
import { injectReducer, removeReducer } from "@/store";
import reducer from "@/features/common/price-display/store";
import { PRICE_DISPLAY } from "@/features/common/price-display/constants";

interface IUseHandlePriceDisplay {
    reducerKey: string;
    storeKey: string;
    initialValue: IPriceDisplay;
}

export function useHandlePriceDisplay({
    reducerKey,
    storeKey,
    initialValue,
}: IUseHandlePriceDisplay) {
    const dispatch = useAppDispatch();

    const dynamicReducerKey = useMemo(
        () => `${PRICE_DISPLAY}_${reducerKey}`,
        [reducerKey]
    );

    useLayoutEffect(() => {
        injectReducer(dynamicReducerKey, reducer);

        return () => {
            removeReducer(dynamicReducerKey);
        };
    }, [dynamicReducerKey]);

    const price = useGetPriceValue({ reducerKey, storeKey, initialValue });

    useEffect(() => {
        if (!price) {
            dispatch(
                setInitialState({
                    storeKey,
                    initialValue,
                })
            );
        }
    }, [dispatch, storeKey, initialValue, price]);

    return {
        ...price,
        setPrice: (val: number) => dispatch(setPrice({ storeKey, currentPrice: val })),
        setFlashSalePrice: (val: number) =>
            dispatch(setFlashSalePrice({ storeKey, flashSalePrice: val })),
        setDefaultPrice: (val: number) =>
            dispatch(setDefaultPrice({ storeKey, defaultPrice: val })),
        resetPrice: () => dispatch(resetPrice({ storeKey })),
    };
}
