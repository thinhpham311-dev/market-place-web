import { useCallback, useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setQuantity, setErrorMessages, resetQuantity } from "../store/stateSlice";
import { selectQuantitySelector } from "../store/selectors";
import { injectReducer, removeReducer } from "@/store";
import reducer from "../store";
import { QUANTITY_COUNTER } from "../constants";

interface IUseHandleQuantitySelector {
    reducerKey: string;
    storeKey: string;
    maxQuantity: number;
    initialValue: number;
}

export function useHandleQuantitySelector({
    reducerKey,
    storeKey,
    maxQuantity,
    initialValue,
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

        // Initialize state
        dispatch(setQuantity({ storeKey, quantity: initialValue }));
        dispatch(setErrorMessages({ storeKey, messages: validateQuantity(initialValue) }));

        return () => {
            dispatch(resetQuantity({ storeKey }));
            removeReducer(dynamicReducerKey);
        };
    }, [dispatch, reducerKey, storeKey, initialValue, validateQuantity]);

    // Select from dynamic slice
    const { itemQuantity, errorMessages } = useAppSelector(
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
        dispatch(resetQuantity({ storeKey }));
        dispatch(setQuantity({ storeKey, quantity: initialValue }));
        dispatch(
            setErrorMessages({ storeKey, messages: validateQuantity(initialValue) })
        );
    }, [dispatch, storeKey, initialValue, validateQuantity]);

    return {
        maxQuantity,
        itemQuantity,
        errorMessages,
        handleQuantityChange,
        resetQuantity: resetQuantityHandler,
        validateQuantity,
    };
}
