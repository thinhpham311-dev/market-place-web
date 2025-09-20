import { useLayoutEffect, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSelectedOption, setValidationErrors, resetOptions } from "@/features/common/option-selector/store/stateSlice";
import { Option } from "@/features/common/option-selector/types";
import { injectReducer, removeReducer } from "@/store";
import { selectVariantsStoreKey } from "@/features/common/option-selector/store/selectors";
import reducer from "@/features/common/option-selector/store";
import { initialOptions } from "@/features/common/option-selector/store/stateSlice";
import { OPTION_SELECTOR } from "@/features/common/option-selector/constants";

interface IUseHandleVariantsSelector {
    storeKey: string;
    initialValue: Option[];
}

export function useHandleOptionSelector({ storeKey, initialValue }: IUseHandleVariantsSelector) {
    const dispatch = useAppDispatch();
    useLayoutEffect(() => {
        const reducerKey = `${OPTION_SELECTOR}_${storeKey}`;
        injectReducer(reducerKey, reducer);
        return () => {
            dispatch(resetOptions())
            removeReducer(reducerKey);
        };
    }, [storeKey, dispatch]);

    const { options, sku_tier_idx, validationErrors } = useAppSelector(selectVariantsStoreKey(storeKey));

    useEffect(() => {
        if (initialValue?.length) {
            dispatch(initialOptions(initialValue));
        }

    }, [dispatch, initialValue]);

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


    const validateOptions = () => {
        const errors = getValidationErrors(sku_tier_idx);
        dispatch(setValidationErrors(errors));
        return errors;
    };

    const handleChooseOption = (index: number, value?: number | null) => {
        const updated = [...sku_tier_idx];

        if (value == null) {
            updated[index] = null;
        } else {
            updated[index] = value;
        }

        dispatch(setSelectedOption({ index, value }));

        const errors = getValidationErrors(updated);
        dispatch(setValidationErrors(errors));
    };

    const handleResetOption = () => {
        dispatch(resetOptions())
    }

    const resetValidationErrors = () => {
        dispatch(setValidationErrors({}));
    };

    return { options, optionsCount: options.length, sku_tier_idx, validationErrors, handleChooseOption, handleResetOption, validateOptions, resetValidationErrors };
}
