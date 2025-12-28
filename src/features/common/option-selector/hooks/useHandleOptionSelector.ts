"use client";
import { toast } from "sonner";

import { useLayoutEffect, useEffect, useCallback } from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
    setSelectedOption,
    setValidationErrors,
    resetOptions,
} from "@/features/common/option-selector/store/stateSlice";

import { IOptionInitialValue } from "@/features/common/option-selector/interfaces";
import { injectReducer, removeReducer } from "@/store";
import { useGetOptionSelectorValue } from "./useGetOptionSelectorValue";
import reducer from "@/features/common/option-selector/store";
import { OPTION_SELECTOR } from "@/features/common/option-selector/constants";

interface UseHandleOptionSelectorProps {
    reducerKey?: string;
    storeKey: string;
    initialValue: IOptionInitialValue
}

export function useHandleOptionSelector({
    reducerKey = OPTION_SELECTOR,
    storeKey,
    initialValue,
}: UseHandleOptionSelectorProps) {
    const { initialOptions = [], defaultOptionIdx = [], } = initialValue
    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        injectReducer(reducerKey, reducer);

        return () => {
            removeReducer(reducerKey);
        };
    }, [reducerKey]);


    useEffect(() => {
        defaultOptionIdx.forEach((value, i) => {
            if (value != null) {
                dispatch(setSelectedOption({
                    storeKey,
                    currentValue: { index: i, value }
                }));
            }
        });

    }, [dispatch, storeKey, initialOptions, defaultOptionIdx]);


    const { selectedOptions, validationErrors, optionsCount } = useGetOptionSelectorValue({ storeKey })
    console.log(optionsCount)
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


    const handleChooseOption = (index: number, value: number | null) => {
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
        options: initialOptions,
        selectedOptions,
        optionsCount,
        validationErrors,
        defaultOptionIdx,
        handleChooseOption,
        handleResetOption,
        resetValidationErrors,
    };
}
