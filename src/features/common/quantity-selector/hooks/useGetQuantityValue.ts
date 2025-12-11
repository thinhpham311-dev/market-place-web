"use client";
import { useMemo } from "react"
import { useAppSelector } from "@/lib/hooks";
import { selectQuantitySelector } from "@/features/common/quantity-selector/store/selectors";
import { createDefault, IQuantity } from "../store/initial";

export function useGetQuantityValue(reducerKey: string, storeKey: string, initialValue: IQuantity = createDefault()) {
    const state = useAppSelector(selectQuantitySelector(reducerKey, storeKey));
    return useMemo(() => {
        if (!state) {
            return initialValue
        }

        return state
    }, [state, initialValue]);
}

