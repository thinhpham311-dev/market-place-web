"use client";

import * as React from "react";
import { memo } from "react";
import VariantSelectorCard from "./VariantSelectorCard";
import { useVariantsSelectorContext } from "./hooks";
import { VariantOption } from "@/interfaces/spu"


const VariantsSelectorList = () => {
    const { variants } = useVariantsSelectorContext();
    return (
        <div className="space-y-5">
            {variants.map((_: VariantOption, i: number) => {
                return (
                    <React.Fragment key={`${_.options}_${i}`}>
                        <VariantSelectorCard
                            label={_.label}
                            value={_.value as VariantOption[]}
                            index={i}
                        />

                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default memo(VariantsSelectorList);
