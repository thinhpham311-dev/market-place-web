"use client";

import * as React from "react";
import { memo } from "react";
import VariantSelectorCard from "./VariantSelectorCard";
import { useVariantsSelectorContext } from "./hooks";
import { VariantOption } from "./types"



const VariantsSelectorList = () => {
    const { selectedOptions, validationErrors } = useVariantsSelectorContext();
    return (
        <div className="space-y-5">
            {selectedOptions.map((_: VariantOption, i: number) => {
                if (Array.isArray(_.options)) {
                    return (
                        <React.Fragment key={`${_.options}_${i}`}>
                            <VariantSelectorCard
                                label={_.name}
                                options={_.options as VariantOption[]}
                                index={i}
                            />
                            {validationErrors?.includes(`${_.name} is required.`) && (
                                <p className="text-red-500 text-xs my-2">{`${_.name} is required.`}</p>
                            )}
                        </React.Fragment>
                    );
                }
                return null;
            })}
        </div>
    );
}

export default memo(VariantsSelectorList);
