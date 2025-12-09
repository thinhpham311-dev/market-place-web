"use client";
import { useMemo } from "react"
import { useAppSelector } from "@/lib/hooks";
import { selectQuantitySelector } from "@/features/common/quantity-selector/store/selectors";
import { createDefault, IQuantity } from "../store/initial";

export function useGetQuantityValue(dynamicReducerKey: string, storeKey: string, initialValue: IQuantity = createDefault()) {
    const state = useAppSelector(selectQuantitySelector(dynamicReducerKey, storeKey));

    return useMemo(() => {
        if (!state) {
            return {
                currentQuantity: initialValue?.currentQuantity,
            };
        }

        return {
            currentQuantity: state.currentQuantity,
        };
    }, [state, initialValue]);
}

