"use client";
import { toast } from "sonner";

import { useLayoutEffect, useEffect, useCallback, useRef } from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
    setInitialState,
    setSelectedOption,
    setValidationErrors,
    resetOptions,
} from "@/features/common/option-selector/store/stateSlice";

import { Option } from "@/features/common/option-selector/types";
import { injectReducer, removeReducer } from "@/store";
import { useGetOptionSelectorValue } from "./useGetOptionSelectorValue";
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
    initialOptions = [],
    defaultOptionIdx = [],
}: UseHandleOptionSelectorProps) {

    const dispatch = useAppDispatch();
    const initialized = useRef(false);


    useLayoutEffect(() => {
        const dynamicReducerKey = `${OPTION_SELECTOR}_${reducerKey}`;
        injectReducer(dynamicReducerKey, reducer);

        return () => {
            dispatch(resetOptions({ storeKey }));
            removeReducer(dynamicReducerKey);
        };
    }, [reducerKey, storeKey]);


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


    const { options, selectedOptions, validationErrors } = useGetOptionSelectorValue(reducerKey, storeKey, {
        options: initialOptions,
        selectedOptions: [],
        validationErrors: []
    })


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
        const updated = [...selectedOptions];
        updated[index] = value ?? null;


        dispatch(setSelectedOption({ storeKey, currentValue: { index, value } }));


        const errorsObj = getValidationErrors(updated);

        if (Object.keys(errorsObj).length > 0) {
            setTimeout(() => {
                toast.error("Validation error", {
                    description: Object.values(errorsObj).join(", "),
                });
            }, 200);
        }

        dispatch(setValidationErrors({ storeKey, errors: errorsObj }));
    };


    const handleResetOption = useCallback(() => {
        dispatch(resetOptions({ storeKey }));
        dispatch(setValidationErrors({ storeKey, errors: {} }));


        defaultOptionIdx.forEach((value, i) => {
            if (value != null) {
                dispatch(
                    setSelectedOption({ storeKey, currentValue: { index: i, value } })
                );
            }
        });
    }, [dispatch, defaultOptionIdx, storeKey]);

    const resetValidationErrors = useCallback(() => {
        dispatch(setValidationErrors({ storeKey, errors: [] }));
    }, [dispatch, storeKey]);


    return {
        options,
        selectedOptions,
        defaultOptionIdx,
        validationErrors,
        handleChooseOption,
        handleResetOption,
        resetValidationErrors,
    };
}
