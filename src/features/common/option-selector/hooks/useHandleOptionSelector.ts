"use client";

import { useLayoutEffect, useEffect, useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    setSelectedOption,
    setValidationErrors,
    resetOptions,
    initialOptions,
} from "@/features/common/option-selector/store/stateSlice";
import { Option } from "@/features/common/option-selector/types";
import { injectReducer, removeReducer } from "@/store";
import { selectOptionsStoreKey } from "@/features/common/option-selector/store/selectors";
import reducer from "@/features/common/option-selector/store";
import { OPTION_SELECTOR } from "@/features/common/option-selector/constants";

interface UseHandleOptionSelectorProps {
    storeKey: string;
    initialValue: Option[];
    defaultOptionIdx?: (number | null)[];
}

export function useHandleOptionSelector({
    storeKey,
    initialValue,
    defaultOptionIdx = [],
}: UseHandleOptionSelectorProps) {
    const dispatch = useAppDispatch();
    const initialized = useRef(false);

    // --- Inject reducer lifecycle ---
    useLayoutEffect(() => {
        const reducerKey = `${OPTION_SELECTOR}_${storeKey}`;
        injectReducer(reducerKey, reducer);

        return () => {
            dispatch(resetOptions());
            removeReducer(reducerKey);
        };
    }, [storeKey, dispatch]);

    // --- Selectors ---
    const { options, option_idx, validationErrors } = useAppSelector(
        selectOptionsStoreKey(storeKey)
    );

    // --- Initialize once ---
    useEffect(() => {
        if (initialized.current || !initialValue?.length) return;

        dispatch(initialOptions(initialValue));

        defaultOptionIdx.forEach((value, i) => {
            if (value != null) {
                dispatch(setSelectedOption({ index: i, value }));
            }
        });

        initialized.current = true;
    }, [dispatch, initialValue, defaultOptionIdx]);

    // --- Helpers ---
    const getValidationErrors = useCallback(
        (currentValues: (number | null | undefined)[]) => {
            return initialValue.reduce<Record<number, string>>((acc, opt, i) => {
                if (currentValues[i] === null) {
                    acc[i] = `${opt.label} is required.`;
                }
                return acc;
            }, {});
        },
        [initialValue]
    );

    const handleChooseOption = (index: number, value?: number | null) => {
        const updated = [...option_idx];

        if (value == null) {
            updated[index] = null;
        } else {
            updated[index] = value;
        }

        dispatch(setSelectedOption({ index, value }));

        const errors = getValidationErrors(updated);
        dispatch(setValidationErrors(errors));
    };
    const handleResetOption = useCallback(() => {
        dispatch(resetOptions());
        defaultOptionIdx.forEach((value, i) => {
            if (value != null) dispatch(setSelectedOption({ index: i, value }));
        });
    }, [dispatch, defaultOptionIdx]);

    const resetValidationErrors = useCallback(() => {
        dispatch(setValidationErrors({}));
    }, [dispatch]);

    // --- Return API ---
    return {
        options,
        option_idx,
        defaultOptionIdx,
        validationErrors,
        optionsCount: options.length,
        handleChooseOption,
        handleResetOption,
        resetValidationErrors,
    };
}
