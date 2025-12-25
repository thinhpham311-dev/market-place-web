"use client";
import { useMemo } from "react"
import { useAppSelector } from "@/lib/hooks";
import { selectPriceDisplaySelector } from "@/features/common/price-display/store/selectors";
import { IPriceDisplay, createDefault } from "@/features/common/price-display/store/initial";
import { PRICE_DISPLAY } from "@/features/common/price-display/constants";

interface IGetPriceValue {
    reducerKey?: string,
    storeKey: string,
    initialValue: IPriceDisplay
}

export const useGetPriceValue = ({
    reducerKey = PRICE_DISPLAY,
    storeKey,
    initialValue = createDefault()
}: IGetPriceValue) => {
    const state = useAppSelector(
        selectPriceDisplaySelector(reducerKey, storeKey)
    );

    return useMemo(() => {
        if (!state) {
            return initialValue
        }

        return state
    }, [state, initialValue]);
};
