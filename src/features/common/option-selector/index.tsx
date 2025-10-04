"use client";

import * as React from "react";
import OptionSelectorWrapper from "./OptionSelectorWrapper"
import OptionSelectorList from "./OptionSelectorList";
import { useHandleOptionSelector } from "./hooks";
import OptionSelectorProvider from "./providers";
import { Option } from "./types";

interface IOptionSelectorProps {
    storeKey: string;
    initialValue?: Option[];
    loading?: boolean;
    error?: string | { message?: string } | null;
    defaultOptionIdx?: (number | null)[];
}


const OptionSelector = (({ storeKey, initialValue = [], defaultOptionIdx = [] }: IOptionSelectorProps) => {
    const optionSelector = useHandleOptionSelector({ storeKey, initialValue, defaultOptionIdx });

    return (
        <OptionSelectorProvider contextValues={{ ...optionSelector }}>
            <OptionSelectorWrapper>
                <OptionSelectorList />
            </OptionSelectorWrapper>
        </OptionSelectorProvider>
    );
});

export default OptionSelector;
