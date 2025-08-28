import { useCallback, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    setQuantity,
    setErrorMessages,
    resetQuantity as resetQuantityAction,
} from "../store/stateSlice";

import { selectQuantitySelectorByStoreKey } from "../store/selectors"
import { injectReducer, removeReducer } from "@/store";
import reducer from "../store";

import { QUANTITY_COUNTER } from "../constants"

interface IUseHandleQuantitySelector {
    storeKey: string,
    maxQuantity: number
}

export function useHandleQuantitySelector({
    storeKey,
    maxQuantity
}: IUseHandleQuantitySelector) {
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        const reducerKey = `${QUANTITY_COUNTER}_${storeKey}`;
        injectReducer(reducerKey, reducer);

        return () => {
            dispatch(resetQuantityAction())
            removeReducer(reducerKey);
        };
    }, [dispatch])

    const { currentQuantity, errorMessages } = useAppSelector(selectQuantitySelectorByStoreKey(storeKey));

    console.log("maxQuantity", currentQuantity)
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
    }, [dispatch]);

    return {
        maxQuantity,
        currentQuantity,
        errorMessages,
        handleQuantityChange,
        resetQuantity,
        validateQuantity,
    };
}
