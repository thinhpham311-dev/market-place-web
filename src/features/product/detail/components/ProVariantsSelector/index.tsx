"use client";

import * as React from "react";
import { VariantOption } from "./types"
import VariantsSelectorWrapper from "./VariantsSelectorWrapper"
import VariantsSelectorList from "./VariantsSelectorList";
import { useHandleVariantsSelector } from "./hooks";
import VariantsSelectorProvider from "./providers";

interface IProVariantsSelectorProps {
    storeKey: string;
    options?: VariantOption[];
}


const ProVariantsSelector = (({ storeKey, options = [] }: IProVariantsSelectorProps) => {
    const variantsSelector = useHandleVariantsSelector({ storeKey, options });

    return (
        <VariantsSelectorProvider contextValues={variantsSelector}>
            <VariantsSelectorWrapper>
                <VariantsSelectorList />
            </VariantsSelectorWrapper>
        </VariantsSelectorProvider>
    );
});

export default ProVariantsSelector;
