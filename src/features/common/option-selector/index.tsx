"use client";

import { memo } from "react";
import OptionSelectorWrapper from "./OptionSelectorWrapper"
import OptionSelectorTitle from "./OptionSelectorTitle";
import OptionSelectorList from "./OptionSelectorList";
import { useHandleOptionSelector } from "./hooks";
import OptionSelectorProvider from "./providers";
import { Option } from "./types";

interface IOptionSelectorProps {
    reducerKey: string;
    storeKey: string;
    initialOptions: Option[];
    loading?: boolean;
    error?: string | { message?: string } | null;
    defaultOptionIdx?: (number | null)[];
    title?: string;
    layout?: "vertical" | "horizontal";
    layoutItems?: "vertical" | "horizontal";
}


const OptionSelector = (({ reducerKey, storeKey, initialOptions, defaultOptionIdx, ...rest }: IOptionSelectorProps) => {
    const optionSelector = useHandleOptionSelector({ reducerKey, storeKey, initialOptions, defaultOptionIdx });

    return (
        <OptionSelectorProvider contextValues={{ ...optionSelector, ...rest }}>
            <OptionSelectorWrapper>
                <OptionSelectorTitle />
                <OptionSelectorList />
            </OptionSelectorWrapper>
        </OptionSelectorProvider>
    );
});

export default memo(OptionSelector);
