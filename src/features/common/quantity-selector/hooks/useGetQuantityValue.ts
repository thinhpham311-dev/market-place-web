"use client";

import { useAppSelector } from "@/lib/hooks";
import { selectQuantitySelector } from "@/features/common/quantity-selector/store/selectors";
import { IQuantity } from "../store/initial";

export const useGetQuantityValue = (
    reducerKey: string,
    storeKey: string,
    initialValue: IQuantity
) => {
    const value = useAppSelector(
        selectQuantitySelector(reducerKey, storeKey)
    );

    return value ?? initialValue;
};
