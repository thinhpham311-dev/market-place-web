import { useCallback, useLayoutEffect, useEffect, useMemo } from "react";
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
    onChangeQuantity?: (value: number) => void
    isDisable: boolean
}

export function useHandleQuantitySelector({
    reducerKey,
    storeKey,
    maxQuantity,
    initialQuantity,
    ...rest
}: IUseHandleQuantitySelector) {
    const { onChangeQuantity, isDisable } = rest
    const dispatch = useAppDispatch();

    const validateQuantity = useCallback(
        (newQuantity: number, messages: string[]) => {
            if (newQuantity === maxQuantity) {
                dispatch(setErrorMessages({ storeKey, messages }));
            }
            return [];
        },
        [dispatch, storeKey, maxQuantity]
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
            onChangeQuantity?.(newQuantity);
        },
        [dispatch, storeKey, onChangeQuantity])

    const resetQuantityHandler = useCallback(() => {
        dispatch(resetQuantity({ storeKey }))
    }, [dispatch, storeKey, initialQuantity, validateQuantity]);

    const isDisableQuantity = useMemo(() => {
        return !!(maxQuantity === 0 || isDisable);
    }, [maxQuantity, isDisable]);

    return {
        isDisableQuantity,
        maxQuantity,
        currentQuantity,
        errorMessages,
        updateQuantity: handleQuantityChange,
        resetQuantity: resetQuantityHandler,
        getValidate: validateQuantity,
    };
}
