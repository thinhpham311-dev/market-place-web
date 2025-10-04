"use client";

import React from "react";

import { cn } from "@/lib/utils"
import { Option } from "@/features/common/option-selector/types";


interface IOptionSelectorContextType {
    options: Option[];
    optionsCount: number;
    option_idx: (number | null)[];
    defaultOptionIdx?: (number | null)[];
    validationErrors: Record<number, string>;
    handleChooseOption: (index: number, option: number | null) => void;
    resetValidationErrors: () => void;
}


interface IOptionSelectorProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: IOptionSelectorContextType
}

export const OptionSelectorContext = React.createContext<IOptionSelectorContextType | null>(null);

const OptionSelectorProvider = ({ children, className, contextValues }: IOptionSelectorProviderProps) => {
    return (
        <OptionSelectorContext.Provider value={contextValues}>
            <div className={cn(className)}>
                {children}
            </div>
        </OptionSelectorContext.Provider>
    );
};

export default OptionSelectorProvider;
