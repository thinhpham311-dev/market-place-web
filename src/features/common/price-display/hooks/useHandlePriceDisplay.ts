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

    // 🔥 Memo hóa key để không tạo lại string mỗi render
    const dynamicReducerKey = useMemo(
        () => `${PRICE_DISPLAY}_${reducerKey}`,
        [reducerKey]
    );

    // 🔥 Inject reducer chỉ 1 lần cho mỗi reducerKey
    useLayoutEffect(() => {
        injectReducer(dynamicReducerKey, reducer);

        return () => {
            removeReducer(dynamicReducerKey);
        };
    }, [dynamicReducerKey]);

    // 🔥 Lấy state hiện tại
    const price = useGetPriceValue(reducerKey, storeKey, initialValue);

    // 🔥 Chỉ setInitialState nếu chưa tồn tại trong Redux
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
