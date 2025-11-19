"use client";

import * as React from "react";
import OptionSelectorWrapper from "./OptionSelectorWrapper"
import OptionSelectorTitle from "./OptionSelectorTitle";
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
    title?: string;
    layout?: "vertical" | "horizontal";
    layoutItems?: "vertical" | "horizontal";
}


const OptionSelector = (({ storeKey, initialValue = [], defaultOptionIdx = [], ...rest }: IOptionSelectorProps) => {
    const optionSelector = useHandleOptionSelector({ storeKey, initialValue, defaultOptionIdx });

    return (
        <OptionSelectorProvider contextValues={{ ...optionSelector, ...rest }}>
            <OptionSelectorWrapper>
                <OptionSelectorTitle />
                <OptionSelectorList />
            </OptionSelectorWrapper>
        </OptionSelectorProvider>
    );
});

export default OptionSelector;
