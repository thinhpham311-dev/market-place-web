"use client";

import * as React from "react";
import { memo } from "react";
import { CardContent } from "@/components/ui";
import OptionSelectorCard from "./OptionSelectorCard";
import { useOptionSelectorContext } from "@/features/common/option-selector/hooks";
import { VariantOption } from "@/interfaces/spu"


const OptionSelectorList = () => {
    const { options } = useOptionSelectorContext();
    return (
        <CardContent className="p-3 space-y-5 w-full">
            {options.map((_: VariantOption, i: number) => {
                return (
                    <React.Fragment key={`${_.options}_${i}`}>
                        <OptionSelectorCard
                            label={_.label}
                            value={_.value as VariantOption[]}
                            index={i}
                        />
                    </React.Fragment>
                );
            })}
        </CardContent>
    );
}

export default memo(OptionSelectorList);
