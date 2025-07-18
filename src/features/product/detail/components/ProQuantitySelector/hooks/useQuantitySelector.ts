import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    setQuantity,
    setErrorMessages,
    resetQuantity as resetQuantityAction,
} from "../store/stateSlice";

export function useQuantitySelector(maxQuantity: number) {
    const dispatch = useAppDispatch();
    const { currentQuantity, errorMessages } = useAppSelector(
        (state) => state.quantity.state
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
    }, [dispatch]);

    return {
        currentQuantity,
        errorMessages,
        handleQuantityChange,
        resetQuantity,
        validateQuantity,
    };
}
