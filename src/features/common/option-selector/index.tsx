"use client";

import React, { memo, useMemo } from "react";
import OptionSelectorWrapper from "./OptionSelectorWrapper";
import OptionSelectorTitle from "./OptionSelectorTitle";
import OptionSelectorList from "./OptionSelectorList";
import { useHandleOptionSelector } from "./hooks";
import OptionSelectorProvider from "./providers";
import { IOptionInitialValue } from "@/features/common/option-selector/interfaces";

interface IOptionSelectorProps {
  storeKey: string;
  initialValue: IOptionInitialValue;
  title?: string;
  layout?: "vertical" | "horizontal";
  layoutItems?: "vertical" | "horizontal";
}

const OptionSelector = React.forwardRef<HTMLDivElement, IOptionSelectorProps>(
  ({ storeKey, initialValue, title, layout, layoutItems }, ref) => {
    const optionSelector = useHandleOptionSelector({
      storeKey,
      initialValue,
    });
    const contextValues = useMemo(
      () => ({ ...optionSelector, title, layout, layoutItems }),
      [layout, layoutItems, optionSelector, title],
    );

    return (
      <OptionSelectorProvider contextValues={contextValues}>
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
