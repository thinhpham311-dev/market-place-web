import { useCallback, useEffect, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setInitialState, setQuantity, setErrorMessages, resetQuantity } from "../store/stateSlice";
import { selectQuantitySelector } from "../store/selectors";
import { injectReducer, removeReducer } from "@/store";
import reducer from "../store";
import { QUANTITY_COUNTER } from "../constants";

interface IUseHandleQuantitySelector {
    reducerKey: string;
    storeKey: string;
    maxQuantity: number;
    initialQuantity: number;
}

export function useHandleQuantitySelector({
    reducerKey,
    storeKey,
    maxQuantity,
    initialQuantity,
}: IUseHandleQuantitySelector) {
    const dispatch = useAppDispatch();

    const validateQuantity = useCallback(
        (newQuantity: number) => {
            if (newQuantity === maxQuantity) {
                return [
                    "If more quantity is added, purchase limit will be exceeded and price may change",
                ];
            }
            return [];
        },
        [maxQuantity]
    );


    useLayoutEffect(() => {
        const dynamicReducerKey = `${QUANTITY_COUNTER}_${reducerKey}`;
        // Inject reducer
        injectReducer(dynamicReducerKey, reducer);

        return () => {
            dispatch(resetQuantity({ storeKey }))
            removeReducer(dynamicReducerKey);
        };

    }, [dispatch, reducerKey, storeKey, validateQuantity]);

    useEffect(() => {
        const initialValue = {
            currentQuantity: initialQuantity,
            errorMessages
        }
        dispatch(setInitialState({ storeKey, initialValue }))
    }, [dispatch, storeKey, initialQuantity])

    // Select from dynamic slice
    const { currentQuantity, errorMessages } = useAppSelector(
        selectQuantitySelector(reducerKey, storeKey)
    );

    const handleQuantityChange = useCallback(
        (newQuantity: number) => {
            dispatch(setQuantity({ storeKey, quantity: newQuantity }));
            dispatch(
                setErrorMessages({ storeKey, messages: validateQuantity(newQuantity) })
            );
        },
        [dispatch, storeKey, validateQuantity]
    );

    const resetQuantityHandler = useCallback(() => {
        dispatch(resetQuantity({ storeKey }))
    }, [dispatch, storeKey, initialQuantity, validateQuantity]);

    return {
        maxQuantity,
        currentQuantity,
        errorMessages,
        handleQuantityChange,
        resetQuantity: resetQuantityHandler,
        validateQuantity,
    };
}
