import { toast } from "sonner";

import {
    useCallback,
    useLayoutEffect,
    useEffect,
    useMemo,
    useRef,
} from "react";
import { IQuantity } from "@/features/common/quantity-selector/store/initial"
import { useAppDispatch } from "@/lib/hooks";
import { useGetQuantityValue } from "@/features/common/quantity-selector/hooks/useGetQuantityValue";
import { setInitialState, setQuantity, resetQuantity } from "@/features/common/quantity-selector/store/stateSlice";
import { injectReducer, removeReducer } from "@/store";
import reducer from "../store";
import { QUANTITY_COUNTER } from "../constants";

interface IUseHandleQuantitySelector {
    reducerKey: string;
    storeKey: string;
    maxQuantity: number;
    initialValue: IQuantity;
    onChangeQuantity?: (value: number) => void;
}

export function useHandleQuantitySelector({
    reducerKey,
    storeKey,
    maxQuantity,
    initialValue,
    onChangeQuantity,
}: IUseHandleQuantitySelector) {

    const dispatch = useAppDispatch();

    const initRef = useRef(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 🔥 Memo hóa key để không tạo lại string mỗi render
    const dynamicReducerKey = useMemo(
        () => `${QUANTITY_COUNTER}_${reducerKey}`,
        [reducerKey]
    );
    // ⬅ reducer injection - only once
    useLayoutEffect(() => {
        injectReducer(dynamicReducerKey, reducer);

        return () => {
            removeReducer(dynamicReducerKey);
        };
    }, [dispatch, dynamicReducerKey]);

    // ⬅ initial quantity set
    useEffect(() => {
        if (!initRef.current) {
            dispatch(
                setInitialState({
                    storeKey,
                    initialValue,
                })
            );
            initRef.current = true;
        }
    }, [dispatch, storeKey, initialValue]);


    const { currentQuantity } = useGetQuantityValue(reducerKey, storeKey, initialValue);


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
        return maxQuantity === 0;
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
