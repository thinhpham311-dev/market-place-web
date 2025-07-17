"use client";

import * as React from "react";
import { memo } from "react";
import VariantSelector from "./VariantSelector"; // Component con hiển thị danh sách lựa chọn
import { PropertiesValidate } from "@/lib/handleError";

// Types
export type VariantOption = {
    label: string;
    value: string | VariantOption[];
};

interface ProVariantsSelectorProps {
    options?: VariantOption[];
}

export interface ProVariantsSelectorRef {
    validateOptions: () => string[];
    selectedOptions: (VariantOption | null)[];
    validationErrors?: string[];
}

const ProVariantsSelector = React.forwardRef<
    ProVariantsSelectorRef,
    ProVariantsSelectorProps
>(({ options = [] }, ref) => {
    const [selectedOptions, setSelectedOptions] = React.useState<(VariantOption | null)[]>([]);
    const [validationErrors, setValidationErrors] = React.useState<string[]>([]);

    const handleChooseOption = (index: number, selectedValue: VariantOption | null) => {
        const updatedSelected = [...selectedOptions];
        updatedSelected[index] = selectedValue;
        setSelectedOptions(updatedSelected);

        const newErrors = options
            .map((_, i) => (!updatedSelected[i] ? _.label : null))
            .filter(Boolean) as string[];
        setValidationErrors(newErrors);
    };

    const validateOptions = React.useCallback((): string[] => {
        const errors = PropertiesValidate(
            options,
            (_, i) => (selectedOptions[i] ? null : `The option ${_.label} is not selected`)
        );
        setValidationErrors(errors);
        return errors;
    }, [options, selectedOptions]);

    React.useImperativeHandle(ref, () => ({
        validateOptions,
        selectedOptions,
        validationErrors,
    }));

    return (
        <div className="space-y-5">
            {options.map((_, i) => {
                if (Array.isArray(_.value)) {
                    return (
                        <div key={i}>
                            <VariantSelector
                                label={_.label}
                                data={_.value}
                                onChange={(selectedValue) => handleChooseOption(i, selectedValue)}
                            />
                            {validationErrors.includes(_.label) && (
                                <p className="text-red-500 text-xs my-2">{`${_.label} is required.`}</p>
                            )}
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
});

ProVariantsSelector.displayName = "ProVariantsSelector";
export default memo(ProVariantsSelector);
