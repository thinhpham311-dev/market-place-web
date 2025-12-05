"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectPriceDisplaySelector } from "@/features/common/price-display/store/selectors";
import { IPriceDisplay } from "@/features/common/price-display/store/initial";

export const useGetPriceValue = (
    reducerKey: string,
    storeKey: string,
    defaultValue: IPriceDisplay
) => {
    const state = useAppSelector(
        selectPriceDisplaySelector(reducerKey, storeKey)
    );

    return state ?? defaultValue;
};
