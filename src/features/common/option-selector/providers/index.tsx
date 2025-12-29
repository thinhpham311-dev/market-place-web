"use client";

import React from "react";

import { cn } from "@/utils/styles";
import { Option } from "@/features/common/option-selector/types";

interface IOptionSelectorContextType {
  options: Option[];
  selectedOptions: (number | null)[];
  title?: string;
  layout?: "vertical" | "horizontal";
  defaultOptionIdx?: (number | null)[];
  validationErrors: Record<number, string>;
  handleChooseOption: (index: number, option: number | null) => void;
  resetValidationErrors: () => void;
}

interface IOptionSelectorProviderProps {
  children?: React.ReactNode;
  className?: string;
  contextValues: IOptionSelectorContextType;
}

export const OptionSelectorContext = React.createContext<IOptionSelectorContextType | null>(null);

const OptionSelectorProvider = ({
  children,
  className,
  contextValues,
  ...rest
}: IOptionSelectorProviderProps) => {
  return (
    <OptionSelectorContext.Provider value={{ ...contextValues, ...rest }}>
      <div className={cn(className)}>{children}</div>
    </OptionSelectorContext.Provider>
  );
};

export default OptionSelectorProvider;
