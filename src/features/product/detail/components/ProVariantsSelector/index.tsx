"use client";

import * as React from "react";
import { memo } from "react";
import VariantSelector from "./VariantSelector";
import { useVariantsSelector } from "./hooks";
import { VariantOption } from "./types"
import { injectReducer } from "@/store";
import reducer from "./store";

interface ProVariantsSelectorProps {
    options?: VariantOption[];
}

export interface ProVariantsSelectorRef {
    validateOptions: () => string[];
    selectedOptions: (VariantOption | null)[];
    validationErrors?: string[];
}

injectReducer("variants", reducer)

const ProVariantsSelector = React.forwardRef<
    ProVariantsSelectorRef,
    ProVariantsSelectorProps
>(({ options = [] }, ref) => {
    const { selectedOptions, validationErrors, validateOptions } =
        useVariantsSelector(options);

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
                                data={_.value as VariantOption[]}
                                index={i}
                            />
                            {validationErrors.includes(`${_.label} is required.`) && (
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
