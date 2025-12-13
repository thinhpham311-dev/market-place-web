"use client";

import React, { memo } from "react";
import OptionSelectorWrapper from "./OptionSelectorWrapper";
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

const OptionSelector = React.forwardRef<
    HTMLDivElement,
    IOptionSelectorProps
>(({
    reducerKey,
    storeKey,
    initialOptions,
    defaultOptionIdx,
    ...rest
}, ref) => {

    const optionSelector = useHandleOptionSelector({
        reducerKey,
        storeKey,
        initialOptions,
        defaultOptionIdx
    });

    return (
        <OptionSelectorProvider contextValues={{ ...optionSelector, ...rest }}>
            {/* 👇 ref phải gắn vào DOM */}
            <div ref={ref}>
                <OptionSelectorWrapper>
                    <OptionSelectorTitle />
                    <OptionSelectorList />
                </OptionSelectorWrapper>
            </div>
        </OptionSelectorProvider>
    );
});

OptionSelector.displayName = "OptionSelector";

export default memo(OptionSelector);
