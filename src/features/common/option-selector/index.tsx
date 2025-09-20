"use client";

import * as React from "react";
import OptionSelectorWrapper from "./OptionSelectorWrapper"
import OptionSelectorList from "./OptionSelectorList";
import OptionSelectorAlert from "./OptionSelectorAlert";
import { useHandleOptionSelector } from "./hooks";
import OptionSelectorProvider from "./providers";
import { Option } from "./types";

interface IOptionSelectorProps {
    storeKey: string;
    initialValue?: Option[];
    loading?: boolean;
    error?: string | { message?: string } | null;
}


const OptionSelector = (({ storeKey, initialValue = [] }: IOptionSelectorProps) => {
    const optionSelector = useHandleOptionSelector({ storeKey, initialValue });

    return (
        <OptionSelectorProvider contextValues={{ ...optionSelector }}>
            <OptionSelectorWrapper>
                <OptionSelectorAlert />
                <OptionSelectorList />
            </OptionSelectorWrapper>
        </OptionSelectorProvider>
    );
});

export default OptionSelector;
