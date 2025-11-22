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
    defaultOptionIdx?: (Option | null)[];
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
            removeReducer(reducerKey);
        };
    }, [reducerKey, storeKey, dispatch]);


    // --- Initialize once ---
    useEffect(() => {
        if (initialized.current || !initialOptions?.length) return;
        const initialValue = {
            options: initialOptions,
            selectedOptions: [],
            validationErrors: []
        }
        dispatch(setInitialState({ storeKey, initialValue }));

        defaultOptionIdx.forEach((value, i) => {
            if (value != null) {
                const currentValue = { index: i, value }
                dispatch(setSelectedOption({ storeKey, currentValue }));
            }
        });

        initialized.current = true;
    }, [dispatch, storeKey, initialOptions, defaultOptionIdx]);

    // --- Selectors ---
    const { options, option_idx, validationErrors } = useAppSelector(
        selectOptionsStoreKey(reducerKey, storeKey)
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

        if (value == null) {
            updated[index] = null;
        } else {
            updated[index] = value;
        }
        const currentValue = { index, value }
        dispatch(setSelectedOption({ storeKey, currentValue }));

        const errorsObj = getValidationErrors(updated);
        const errors = Object.values(errorsObj);
        dispatch(setValidationErrors({ storeKey, errors }));
    };
    const handleResetOption = useCallback(() => {
        dispatch(resetOptions({ storeKey }));
        defaultOptionIdx.forEach((value, i) => {
            const currentValue = { index: i, value }
            if (value != null) dispatch(setSelectedOption({ storeKey, currentValue }));
        });
    }, [dispatch, defaultOptionIdx]);

    const resetValidationErrors = useCallback(() => {
        dispatch(setValidationErrors({ storeKey, errors: [] }));
    }, [dispatch, storeKey]);

    // --- Return API ---
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
