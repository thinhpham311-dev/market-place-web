"use client";

import * as React from "react";
import { memo } from "react";
import VariantSelectorCard from "./VariantSelectorCard";
import { useVariantsSelectorContext } from "./hooks";
import { VariantOption } from "./types"


const VariantsSelectorList = () => {
    const { data, selectedOptions, validationErrors } = useVariantsSelectorContext();
    console.log(selectedOptions)
    return (
        <div className="space-y-5">
            {data.map((_: VariantOption, i: number) => {
                return (
                    <React.Fragment key={`${_.options}_${i}`}>
                        <VariantSelectorCard
                            label={_.label}
                            value={_.value as VariantOption[]}
                            index={i}
                        />
                        {validationErrors?.includes(`${_.name} is required.`) && (
                            <p className="text-red-500 text-xs my-2">{`${_.name} is required.`}</p>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default memo(VariantsSelectorList);
