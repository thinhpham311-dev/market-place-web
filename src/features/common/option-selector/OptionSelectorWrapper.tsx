"use client";

import * as React from "react";
import { Card } from "@/components/ui"
import { useOptionSelectorContext } from "@/features/common/option-selector/hooks";


const VariantsSelectorWrapper = ({ children }: { children: React.ReactNode }) => {
    const { layout } = useOptionSelectorContext();

    return (
        <Card layout={layout} className=" border-none shadow-none ">
            {children}
        </Card>
    );
}

VariantsSelectorWrapper.displayName = "VariantsSelectorWrapper";
export default React.memo(VariantsSelectorWrapper);
