import { toast } from "sonner";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { IQuantityInitialValue } from "@/features/common/quantity-selector/interfaces";
import { useAppDispatch } from "@/lib/hooks";
import { useGetQuantityValue } from "@/features/common/quantity-selector/hooks/useGetQuantityValue";
import {
  initQuantity,
  setQuantity,
  resetQuantity,
} from "@/features/common/quantity-selector/store/stateSlice";
import { withEnsureInit } from "@/features/common/quantity-selector/helpers";
interface IUseHandleQuantitySelector {
  storeKey: string;
  initialValue: IQuantityInitialValue;
  onChangeQuantity?: (value: number) => void;
}

export function useHandleQuantitySelector({
  storeKey,
  initialValue,
  onChangeQuantity,
}: IUseHandleQuantitySelector) {
  const dispatch = useAppDispatch();
  const { defaultCurrentQuantity, maxQuantity } = initialValue;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (defaultCurrentQuantity != null) {
      dispatch(
        initQuantity({
          storeKey,
          quantity: defaultCurrentQuantity,
        }),
      );
    }
  }, [dispatch, storeKey, defaultCurrentQuantity]);

  const { currentQuantity } = useGetQuantityValue({
    storeKey,
    initialState: {
      currentQuantity: defaultCurrentQuantity || 0,
    },
  });

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
    [maxQuantity],
  );

  // ⬅ update quantity
  const handleQuantityChange = useCallback(
    (newQuantity: number) => {
      if (maxQuantity === 0) return;

      dispatch(withEnsureInit(setQuantity({ key: storeKey, quantity: newQuantity }), [storeKey]));

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        onChangeQuantity?.(newQuantity);
        timeoutRef.current = null;
      }, 250);
    },
    [dispatch, storeKey, onChangeQuantity, maxQuantity],
  );

  const resetQuantityHandler = useCallback(() => {
    dispatch(withEnsureInit(resetQuantity({ key: storeKey }), [storeKey]));
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
