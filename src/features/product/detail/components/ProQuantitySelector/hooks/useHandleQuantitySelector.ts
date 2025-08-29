import { useCallback, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    setQuantity,
    setErrorMessages,
    resetQuantity as resetQuantityAction,
} from "../store/stateSlice";

import { selectQuantitySelectorByStoreKey } from "../store/selectors";
import { injectReducer, removeReducer } from "@/store";
import reducer from "../store";

import { QUANTITY_COUNTER } from "../constants";

interface IUseHandleQuantitySelector {
    storeKey: string;
    initialValue: number;
    maxQuantity: number;
}

export function useHandleQuantitySelector({
    storeKey,
    initialValue,
    maxQuantity = 0,
}: IUseHandleQuantitySelector) {
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        const reducerKey = `${QUANTITY_COUNTER}_${storeKey}`;
        injectReducer(reducerKey, reducer);

        // Set initial value when reducer is injected
        if (initialValue) {
            dispatch(setQuantity(initialValue));
            dispatch(setErrorMessages(validateQuantity(initialValue)));
        }

        return () => {
            dispatch(resetQuantityAction());
            removeReducer(reducerKey);
        };
    }, [dispatch, storeKey, initialValue, maxQuantity]);

    const { currentQuantity, errorMessages } = useAppSelector(
        selectQuantitySelectorByStoreKey(storeKey)
    );

    const validateQuantity = useCallback(
        (newQuantity: number) => {
            if (newQuantity > maxQuantity) {
                return [
                    `If more quantity is added, purchase limit will be exceeded and price may change`,
                ];
            }
            return [];
        },
        [maxQuantity]
    );

    const handleQuantityChange = useCallback(
        (newQuantity: number) => {
            dispatch(setQuantity(newQuantity));
            dispatch(setErrorMessages(validateQuantity(newQuantity)));
        },
        [dispatch, validateQuantity]
    );

    const resetQuantity = useCallback(() => {
        dispatch(resetQuantityAction());

        // reset về initialValue sau khi reset
        if (initialValue) {
            dispatch(setQuantity(initialValue));
            dispatch(setErrorMessages(validateQuantity(initialValue)));
        }
    }, [dispatch, initialValue, validateQuantity]);

    return {
        maxQuantity,
        currentQuantity,
        errorMessages,
        handleQuantityChange,
        resetQuantity,
        validateQuantity,
    };
}
