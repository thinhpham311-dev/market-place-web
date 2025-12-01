"use client";

import { useLayoutEffect, useEffect, useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    setInitialState,
    setSelectedOption,
    setValidationErrors,
    resetOptions,
} from "@/features/common/option-selector/store/stateSlice";

import { Option } from "@/features/common/option-selector/types";
import { injectReducer, removeReducer } from "@/store";
import { selectOptionsStoreKey } from "@/features/common/option-selector/store/selectors";
import reducer from "@/features/common/option-selector/store";
import { OPTION_SELECTOR } from "@/features/common/option-selector/constants";

interface UseHandleOptionSelectorProps {
    reducerKey: string;
    storeKey: string;
    initialOptions: Option[];
    defaultOptionIdx?: (number | null)[];
}

export function useHandleOptionSelector({
    reducerKey,
    storeKey,
    initialOptions,
    defaultOptionIdx = [],
}: UseHandleOptionSelectorProps) {

    const dispatch = useAppDispatch();
    const initialized = useRef(false);


    // --- Inject reducer lifecycle ---
    useLayoutEffect(() => {
        const dynamicReducerKey = `${OPTION_SELECTOR}_${reducerKey}`;
        injectReducer(dynamicReducerKey, reducer);

        return () => {
            dispatch(resetOptions({ storeKey }));
            removeReducer(dynamicReducerKey); // FIX BUG
        };
    }, [reducerKey, storeKey]);


    // --- Initialize once ---
    useEffect(() => {
        if (initialized.current || !initialOptions?.length) return;

        dispatch(setInitialState({
            storeKey,
            initialValue: {
                options: initialOptions,
                selectedOptions: [],
                validationErrors: []
            }
        }));

        defaultOptionIdx.forEach((value, i) => {
            if (value != null) {
                dispatch(setSelectedOption({
                    storeKey,
                    currentValue: { index: i, value }
                }));
            }
        });

        initialized.current = true;
    }, [dispatch, storeKey, initialOptions, defaultOptionIdx]);


    // --- Selectors ---
    const { options, option_idx, validationErrors } = useAppSelector(
        selectOptionsStoreKey(reducerKey, storeKey) // FIX BUG
    );


    // --- Helpers ---
    const getValidationErrors = useCallback(
        (currentValues: (number | null | undefined)[]) => {
            return initialOptions.reduce<Record<number, string>>((acc, opt, i) => {
                if (currentValues[i] === null) {
                    acc[i] = `${opt.label} is required.`;
                }
                return acc;
            }, {});
        },
        [initialOptions]
    );


    const handleChooseOption = (index: number, value: Option | number | null) => {
        const updated = [...option_idx];
        updated[index] = value ?? null;

        dispatch(setSelectedOption({
            storeKey,
            currentValue: { index, value }
        }));

        const errorsObj = getValidationErrors(updated);
        dispatch(setValidationErrors({
            storeKey,
            errors: Object.values(errorsObj)
        }));
    };


    const handleResetOption = useCallback(() => {
        dispatch(resetOptions({ storeKey }));
        dispatch(setValidationErrors({ storeKey, errors: [] })); // FIX BUG

        defaultOptionIdx.forEach((value, i) => {
            if (value != null) {
                dispatch(setSelectedOption({
                    storeKey,
                    currentValue: { index: i, value }
                }));
            }
        });
    }, [dispatch, defaultOptionIdx, storeKey]);


    const resetValidationErrors = useCallback(() => {
        dispatch(setValidationErrors({ storeKey, errors: [] }));
    }, [dispatch, storeKey]);


    return {
        options,
        option_idx,
        defaultOptionIdx,
        validationErrors,
        handleChooseOption,
        handleResetOption,
        resetValidationErrors,
    };
}
