"use client";

import React, { memo } from "react";
import OptionSelectorWrapper from "./OptionSelectorWrapper";
import OptionSelectorTitle from "./OptionSelectorTitle";
import OptionSelectorList from "./OptionSelectorList";
import { useHandleOptionSelector } from "./hooks";
import OptionSelectorProvider from "./providers";
import { IOptionInitialValue } from "@/features/common/option-selector/interfaces";

interface IOptionSelectorProps {
  storeKey: string;
  initialValue: IOptionInitialValue;
  loading?: boolean;
  error?: string | { message?: string } | null;
  title?: string;
  layout?: "vertical" | "horizontal";
  layoutItems?: "vertical" | "horizontal";
}

const OptionSelector = React.forwardRef<HTMLDivElement, IOptionSelectorProps>(
  ({ storeKey, initialValue, ...rest }, ref) => {
    const optionSelector = useHandleOptionSelector({
      storeKey,
      initialValue,
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
  },
);

OptionSelector.displayName = "OptionSelector";

export default memo(OptionSelector);
