import { toast } from "sonner";

import {
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
} from "react";
import { IQuantityInitialValue } from "@/features/common/quantity-selector/interfaces"
import { useAppDispatch } from "@/lib/hooks";
import { useGetQuantityValue } from "@/features/common/quantity-selector/hooks/useGetQuantityValue";
import { setQuantity, resetQuantity } from "@/features/common/quantity-selector/store/stateSlice";
import { injectReducer, removeReducer } from "@/store";
import reducer from "../store";
import { QUANTITY_COUNTER } from "@/features/common/quantity-selector/constants";

interface IUseHandleQuantitySelector {
    reducerKey?: string;
    storeKey: string;
    initialValue: IQuantityInitialValue;
    onChangeQuantity?: (value: number) => void;
}

export function useHandleQuantitySelector({
    reducerKey = QUANTITY_COUNTER,
    storeKey,
    initialValue,
    onChangeQuantity,
}: IUseHandleQuantitySelector) {
    const dispatch = useAppDispatch();
    const { maxQuantity } = initialValue
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // ⬅ reducer injection - only once
    useLayoutEffect(() => {
        injectReducer(reducerKey, reducer);

        return () => {
            removeReducer(reducerKey);
        };
    }, [dispatch, reducerKey]);

    const { currentQuantity } = useGetQuantityValue({ storeKey });

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
            if (maxQuantity === 0) return;

            dispatch(setQuantity({ storeKey, quantity: newQuantity }));

            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {
                onChangeQuantity?.(newQuantity);
                timeoutRef.current = null;
            }, 250);
        },
        [dispatch, storeKey, onChangeQuantity, maxQuantity]
    );

    const resetQuantityHandler = useCallback(() => {
        dispatch(resetQuantity({ storeKey }));
    }, [dispatch, storeKey]);

    const isDisabledQuantity = useMemo(() => {
        return !maxQuantity || maxQuantity === 0;
    }, [maxQuantity]);

    return {
        isDisabledQuantity,
        maxQuantity,
        currentQuantity,
        updateQuantity: handleQuantityChange,
        resetQuantity: resetQuantityHandler,
        getValidate: getValidateQuantity,
    };
}
