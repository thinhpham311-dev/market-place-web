import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSelectedOption, setValidationErrors } from "../store/stateSlice";
import { VariantOption } from "../types";
import { injectReducer } from "@/store";
import { selectVariantsStoreKey } from "../store/selectors"
import reducer from "../store";
import { initialOptions } from "../store/stateSlice";
import { VARIANT_SELECTOR } from "../constants"
import { useLayoutEffect } from "react";

interface IUseHandleVariantsSelector {
    storeKey: string
    options: VariantOption[];
}

export function useHandleVariantsSelector({ storeKey, options }: IUseHandleVariantsSelector) {
    useLayoutEffect(() => {
        const reducerKey = `${VARIANT_SELECTOR}_${storeKey}`;
        injectReducer(reducerKey, reducer)
    }, [storeKey])

    const dispatch = useAppDispatch();
    const { selectedOptions, validationErrors } = useAppSelector(selectVariantsStoreKey(storeKey));
    useLayoutEffect(() => {
        if (options) {
            dispatch(initialOptions(options as VariantOption[]));
        }
    }, [dispatch, options]);

    const validateOptions = () => {
        const errors = options
            .map((opt, i) => (!selectedOptions[i] ? `${opt.label} is required.` : null))
            .filter(Boolean) as string[];
        dispatch(setValidationErrors(errors));
        return errors;
    };

    const handleChooseOption = (index: number, value: VariantOption | null) => {
        dispatch(setSelectedOption({ index, value }));
        const updated = [...selectedOptions];
        updated[index] = value;
        const errors = options
            .map((opt, i) => (!updated[i] ? `${opt.label} is required.` : null))
            .filter(Boolean) as string[];
        dispatch(setValidationErrors(errors));
    };


    return { selectedOptions, validationErrors, handleChooseOption, validateOptions };
}
