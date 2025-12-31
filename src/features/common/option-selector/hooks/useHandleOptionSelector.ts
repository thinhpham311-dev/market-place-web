"use client";
import { toast } from "sonner";
import { useLayoutEffect, useEffect, useCallback, useMemo } from "react";
import { useAppDispatch } from "@/lib/hooks";
import {
  setOptionsCount,
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
  const hasDefaultOptions = useMemo(
    () => defaultOptionIdx.some((value) => value != null),
    [defaultOptionIdx],
  );

  // Setup reducer
  useLayoutEffect(() => {
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

    defaultOptionIdx.forEach((value, index) => {
      if (value != null) {
        dispatch(
          setSelectedOption({
            storeKey,
            currentValue: { index, value },
          }),
        );
      }
    });
  }, [dispatch, storeKey, defaultOptionIdx, hasDefaultOptions]);

  // Get current state
  const { selectedOptions, validationErrors, optionsCount } = useGetOptionSelectorValue({
    storeKey,
    initialValue: {
      selectedOptions: defaultOptionIdx,
      optionsCount: initialOptions.length,
      validationErrors: [],
    },
  });

  // Memoize validation logic
  const getValidationErrors = useCallback(
    (currentValues: (number | null | undefined)[]) => {
      const errors: Record<number, string> = {};

      initialOptions.forEach((option, index) => {
        if (currentValues[index] === null) {
          errors[index] = `${option.label} is required.`;
        }
      });

      return errors;
    },
    [initialOptions],
  );

  // Handle option selection with validation
  const handleChooseOption = useCallback(
    (index: number, value: number | null) => {
      const updatedValues = [...selectedOptions];
      updatedValues[index] = value ?? null;

      dispatch(
        setSelectedOption({
          storeKey,
          currentValue: { index, value },
        }),
      );

      const errors = getValidationErrors(updatedValues);

      if (Object.keys(errors).length > 0) {
        const errorMessages = Object.values(errors).join(", ");

        // Use requestAnimationFrame for better timing with UI updates
        requestAnimationFrame(() => {
          toast.error("Validation error", {
            description: errorMessages,
          });
        });
      }

      dispatch(setValidationErrors({ storeKey, errors }));
    },
    [dispatch, storeKey, selectedOptions, getValidationErrors],
  );

  // Reset options to defaults
  const handleResetOption = useCallback(() => {
    dispatch(resetOptions({ storeKey }));
    dispatch(setValidationErrors({ storeKey, errors: {} }));

    if (hasDefaultOptions) {
      defaultOptionIdx.forEach((value, index) => {
        if (value != null) {
          dispatch(
            setSelectedOption({
              storeKey,
              currentValue: { index, value },
            }),
          );
        }
      });
    }
  }, [dispatch, storeKey, defaultOptionIdx, hasDefaultOptions]);

  // Clear validation errors
  const resetValidationErrors = useCallback(() => {
    dispatch(setValidationErrors({ storeKey, errors: {} }));
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
    hasValidationErrors: Object.keys(validationErrors).length > 0,
    hasSelectedOptions: selectedOptions.some((value: number | string) => value != null),
  };
}
