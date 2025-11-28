import { toast } from "sonner"

import { useCallback, useLayoutEffect, useEffect, useMemo, useRef, } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setInitialState, setQuantity, resetQuantity } from "../store/stateSlice";
import { injectReducer, removeReducer } from "@/store";
import reducer from "../store";
import { QUANTITY_COUNTER } from "../constants";

interface IUseHandleQuantitySelector {
    reducerKey: string;
    storeKey: string;
    maxQuantity: number;
    initialQuantity: number;
    onChangeQuantity?: (value: number) => void
    isDisabled: boolean
}
export function useHandleQuantitySelector({
    reducerKey,
    storeKey,
    maxQuantity,
    initialQuantity,
    onChangeQuantity,
    isDisabled,
}: IUseHandleQuantitySelector) {

    const dispatch = useAppDispatch();
    const isInitializedRef = useRef(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const safeInitialQuantityRef = useRef(
        typeof initialQuantity === "number" ? initialQuantity : 1
    );

    useLayoutEffect(() => {
        const dynamicReducerKey = `${QUANTITY_COUNTER}_${reducerKey}`;
        injectReducer(dynamicReducerKey, reducer);

        return () => {
            dispatch(resetQuantity({ storeKey }));
            removeReducer(dynamicReducerKey);
        };
    }, [dispatch, reducerKey, storeKey]);

    const validateQuantity = useCallback(
        (newQuantity: number, messages: string[]) => {
            if (newQuantity === maxQuantity) {
                setTimeout(() => {
                    const id = toast.error("Reached maximum quantity!", {
                        description: messages.join(", "),
                        action: {
                            label: "Close",
                            onClick: () => {
                                toast.dismiss(id); // 👈 CLOSE TOAST
                            },
                        },
                    });
                }, 500);
            }
        },
        [dispatch, storeKey, maxQuantity]
    );

    useEffect(() => {

        if (!isInitializedRef.current) {
            dispatch(
                setInitialState({
                    storeKey,
                    initialValue: {
                        currentQuantity: safeInitialQuantityRef.current,
                    },
                })
            );
            isInitializedRef.current = true;
        }
    }, [dispatch, storeKey, safeInitialQuantityRef]);


    const handleQuantityChange = useCallback(
        (newQuantity: number) => {
            dispatch(setQuantity({ storeKey, quantity: newQuantity }));

            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                onChangeQuantity?.(newQuantity);
                timeoutRef.current = null;
            }, 250);
        },
        [dispatch, storeKey, onChangeQuantity]
    );

    const resetQuantityHandler = useCallback(() => {
        dispatch(resetQuantity({ storeKey }));
    }, [dispatch, storeKey]);

    const isDisabledQuantity = useMemo(() => {
        return maxQuantity === 0 || isDisabled;
    }, [maxQuantity, isDisabled]);

    return {
        isDisabledQuantity,
        maxQuantity,
        currentQuantity: safeInitialQuantityRef.current,
        updateQuantity: handleQuantityChange,
        resetQuantity: resetQuantityHandler,
        getValidate: validateQuantity,
    };
}
