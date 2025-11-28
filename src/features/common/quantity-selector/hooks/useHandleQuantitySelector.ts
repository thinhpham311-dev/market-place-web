import { toast } from "sonner";
import { selectQuantitySelector } from "../store/selectors";

import {
    useCallback,
    useLayoutEffect,
    useEffect,
    useMemo,
    useRef,
} from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setInitialState, setQuantity, resetQuantity } from "../store/stateSlice";
import { injectReducer, removeReducer } from "@/store";
import reducer from "../store";
import { QUANTITY_COUNTER } from "../constants";

interface IUseHandleQuantitySelector {
    reducerKey: string;
    storeKey: string;
    maxQuantity: number;
    initialQuantity: number;
    onChangeQuantity?: (value: number) => void;
    isDisabled: boolean;
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

    const initRef = useRef(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // ⬅ reducer injection - only once
    useLayoutEffect(() => {
        const dynamicReducerKey = `${QUANTITY_COUNTER}_${reducerKey}`;
        injectReducer(dynamicReducerKey, reducer);

        return () => {
            dispatch(resetQuantity({ storeKey }));
            removeReducer(dynamicReducerKey);

            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [dispatch, reducerKey, storeKey]);

    // ⬅ initial quantity set
    useEffect(() => {
        if (!initRef.current) {
            dispatch(
                setInitialState({
                    storeKey,
                    initialValue: { currentQuantity: initialQuantity },
                })
            );
            initRef.current = true;
        }
    }, [dispatch, storeKey, initialQuantity]);

    const { currentQuantity = initialQuantity } = useAppSelector(
        selectQuantitySelector(reducerKey, storeKey)
    );

    // ⬅ validate
    const getValidateQuantity = useCallback(
        (newQuantity: number, messages: string[]) => {
            if (newQuantity >= maxQuantity) {
                setTimeout(() => {
                    const id = toast.error("Reached maximum quantity!", {
                        description: messages?.join(", "),
                        action: {
                            label: "Close",
                            onClick: () => toast.dismiss(id),
                        },
                    });
                }, 300);
            }
        },
        [maxQuantity]
    );

    // ⬅ update quantity
    const handleQuantityChange = useCallback(
        (newQuantity: number) => {
            if (maxQuantity === 0 || isDisabled) return;

            dispatch(setQuantity({ storeKey, quantity: newQuantity }));

            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                onChangeQuantity?.(newQuantity);
                timeoutRef.current = null;
            }, 250);
        },
        [dispatch, storeKey, onChangeQuantity, maxQuantity, isDisabled]
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
        currentQuantity,
        updateQuantity: handleQuantityChange,
        resetQuantity: resetQuantityHandler,
        getValidate: getValidateQuantity,
    };
}
