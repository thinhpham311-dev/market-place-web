"use client";

import * as React from "react";
import { memo } from "react";
import { CardContent } from "@/components/ui/card";
import OptionSelectorCard from "./OptionSelectorCard";
import { useOptionSelectorContext } from "@/features/common/option-selector/hooks";
import { Option } from "@/features/common/option-selector/types";


const OptionSelectorList = () => {
    const { options } = useOptionSelectorContext();
    return (
        <CardContent className="p-0 space-y-5 w-full">
            {options.map((_: Option | null, i: number) => {
                return (
                    <React.Fragment key={`${_?.options}_${i}`}>
                        <OptionSelectorCard
                            label={_?.label}
                            value={_?.value as Option[]}
                            index={i}
                        />
                    </React.Fragment>
                );
            })}
        </CardContent>
    );
}

export default memo(OptionSelectorList);
