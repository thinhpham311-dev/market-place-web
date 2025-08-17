import { useLayoutEffect, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSelectedOption, setValidationErrors } from "../store/stateSlice";
import { VariantOption } from "../types";
import { injectReducer, removeReducer } from "@/store";
import { selectVariantsStoreKey } from "../store/selectors"
import reducer from "../store";
import { initialOptions } from "../store/stateSlice";
import { VARIANT_SELECTOR } from "../constants"

interface IUseHandleVariantsSelector {
    storeKey: string
    options: VariantOption[];
}

export function useHandleVariantsSelector({ storeKey, options }: IUseHandleVariantsSelector) {
    useLayoutEffect(() => {
        const reducerKey = `${VARIANT_SELECTOR}_${storeKey}`;
        injectReducer(reducerKey, reducer)
        return () => {
            // Cleanup the reducer when the component unmounts
            removeReducer(reducerKey);
        };
    }, [storeKey])

    const dispatch = useAppDispatch();
    const { variants, selectedOptions, validationErrors } = useAppSelector(selectVariantsStoreKey(storeKey));

    useEffect(() => {
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

    const handleChooseOption = (index: number, value?: number | null) => {
        dispatch(setSelectedOption({ index, value }));

        const updated = [...selectedOptions];

        if (value == null) {
            // 🔥 Remove item completely
            updated.splice(index, 1);
        } else {
            updated[index] = value;
        }

        const errors = options
            .map((opt, i) => (!updated[i] ? `${opt.label} is required.` : null))
            .filter(Boolean) as string[];

        dispatch(setValidationErrors(errors));
    };


    return { variants, selectedOptions, validationErrors, handleChooseOption, validateOptions };
}
