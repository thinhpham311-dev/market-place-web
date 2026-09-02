"use client";
import { useEffect, useCallback, useMemo } from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
  setOptionsCount,
  setSelectedOption,
  setSelectedOptions,
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
  initialValue: IOptionInitialValue;
}

export function useHandleOptionSelector({
  reducerKey = OPTION_SELECTOR,
  storeKey,
  initialValue,
}: UseHandleOptionSelectorProps) {
  const { initialOptions, defaultOptionIdx } = initialValue;
  const dispatch = useAppDispatch();

  // Memoize derived values
  const hasDefaultOptions = defaultOptionIdx.some((value) => value != null);

  // Setup reducer
  useEffect(() => {
    injectReducer(reducerKey, reducer);
    return () => removeReducer(reducerKey);
  }, [reducerKey]);

  // Initialize options count
  useEffect(() => {
    dispatch(
      setOptionsCount({
        storeKey,
        options: initialOptions,
      }),
    );
  }, [dispatch, storeKey, initialOptions]);

  // Set default options
  useEffect(() => {
    if (!hasDefaultOptions) return;

    dispatch(
      setSelectedOptions({
        storeKey,
        selectedOptions: [...defaultOptionIdx],
      }),
    );
  }, [dispatch, storeKey, defaultOptionIdx, hasDefaultOptions]);

  // Get current state
  const { selectedOptions, validationErrors, optionsCount } = useGetOptionSelectorValue({
    storeKey,
    initialValue: {
      selectedOptions: defaultOptionIdx,
      optionsCount: initialOptions.length,
      validationErrors: {},
    },
  });

  // Handle option selection with validation cleanup
  const handleChooseOption = useCallback(
    (index: number, value: number | null) => {
      dispatch(
        setSelectedOption({
          storeKey,
          currentValue: { index, value },
        }),
      );

      // If this option had a validation error, clear it
      if (validationErrors && validationErrors[index]) {
        const updatedErrors = { ...validationErrors };
        delete updatedErrors[index];
        dispatch(setValidationErrors({ storeKey, errors: updatedErrors }));
      }
    },
    [dispatch, storeKey, validationErrors],
  );

  // Reset options to defaults
  const handleResetOption = useCallback(() => {
    dispatch(resetOptions({ storeKey }));
    dispatch(setValidationErrors({ storeKey, errors: {} }));

    if (hasDefaultOptions) {
      dispatch(
        setSelectedOptions({
          storeKey,
          selectedOptions: [...defaultOptionIdx],
        }),
      );
    }
  }, [dispatch, storeKey, defaultOptionIdx, hasDefaultOptions]);

  // Clear validation errors
  const resetValidationErrors = useCallback(() => {
    dispatch(setValidationErrors({ storeKey, errors: {} }));
  }, [dispatch, storeKey]);

  return useMemo(
    () => ({
      options: initialOptions,
      selectedOptions,
      optionsCount,
      validationErrors,
      defaultOptionIdx,
      handleChooseOption,
      handleResetOption,
      resetValidationErrors,
      hasValidationErrors: Object.keys(validationErrors).length > 0,
      hasSelectedOptions: selectedOptions.some((value: number | string) => value != null),
    }),
    [
      defaultOptionIdx,
      handleChooseOption,
      handleResetOption,
      initialOptions,
      optionsCount,
      resetValidationErrors,
      selectedOptions,
      validationErrors,
    ],
  );
}
