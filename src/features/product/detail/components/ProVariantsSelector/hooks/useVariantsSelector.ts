import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSelectedOption, setValidationErrors } from "../store/stateSlice";
import { VariantOption } from "../types";

export function useVariantsSelector(options: VariantOption[]) {
    const dispatch = useAppDispatch();
    const selectedOptions = useAppSelector((state) => state.variants.selectedOptions);
    const validationErrors = useAppSelector((state) => state.variants.validationErrors);

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
