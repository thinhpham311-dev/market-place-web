"use client";
import { useMemo } from "react"
import { useAppSelector } from "@/lib/hooks";
import { selectQuantitySelector } from "@/features/common/quantity-selector/store/selectors";
import { createDefault, IQuantity } from "../store/initial";
import { QUANTITY_COUNTER } from "@/features/common/quantity-selector/constants";

interface IGetQuantityValue {
    reducerKey?: string,
    storeKey: string,
    initialValue?: IQuantity
}

export function useGetQuantityValue({
    reducerKey = QUANTITY_COUNTER,
    storeKey,
    initialValue = createDefault()
}: IGetQuantityValue) {
    const state = useAppSelector(selectQuantitySelector(reducerKey, storeKey));
    return useMemo(() => {
        if (!state) {
            return initialValue
        }

        return state
    }, [state, initialValue]);
}

