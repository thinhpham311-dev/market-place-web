import { useLayoutEffect, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSelectedOption, setValidationErrors } from "../store/stateSlice";
import { VariantOption } from "../types";
import { injectReducer, removeReducer } from "@/store";
import { selectVariantsStoreKey } from "../store/selectors";
import reducer from "../store";
import { initialOptions } from "../store/stateSlice";
import { VARIANT_SELECTOR } from "../constants";

interface IUseHandleVariantsSelector {
    storeKey: string;
    options: VariantOption[];
}

export function useHandleVariantsSelector({ storeKey, options }: IUseHandleVariantsSelector) {
    useLayoutEffect(() => {
        const reducerKey = `${VARIANT_SELECTOR}_${storeKey}`;
        injectReducer(reducerKey, reducer);
        return () => {
            removeReducer(reducerKey);
        };
    }, [storeKey]);

    const dispatch = useAppDispatch();
    const { variants, sku_tier_idx, validationErrors } = useAppSelector(selectVariantsStoreKey(storeKey));

    useEffect(() => {
        if (options?.length) {
            dispatch(initialOptions(options));
        }
    }, [dispatch, options]);

    const getValidationErrors = useCallback(
        (currentValues: (number | null | undefined)[]) => {
            return options.reduce<Record<number, string>>((acc, opt, i) => {
                if (currentValues[i] === null) {
                    acc[i] = `${opt.label} is required.`;
                }
                return acc;
            }, {});
        },
        [options]
    );


    const validateOptions = () => {
        const errors = getValidationErrors(sku_tier_idx);
        dispatch(setValidationErrors(errors));
        return errors;
    };

    const handleChooseOption = (index: number, value?: number | null) => {
        const updated = [...sku_tier_idx];

        if (value == null) {
            updated[index] = null; // 🔥 giữ nguyên index để tránh lệch mảng
        } else {
            updated[index] = value;
        }

        dispatch(setSelectedOption({ index, value }));

        const errors = getValidationErrors(updated);
        dispatch(setValidationErrors(errors));
    };

    const resetValidationErrors = () => {
        dispatch(setValidationErrors({})); // clear errors luôn
    };

    return { variants, sku_tier_idx, validationErrors, handleChooseOption, validateOptions, resetValidationErrors };
}
