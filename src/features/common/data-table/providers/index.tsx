"use client";

import React from "react";
import { cn } from "@/lib/utils"
import { HeaderGroup, RowModel } from "@tanstack/react-table";
import { ICartItem } from "@/interfaces/cart";

interface IDataTableContextType {
    getAllLeafColumns: () => any[];
    getHeaderGroups: () => HeaderGroup<any>[];
    getRowModel: () => RowModel<any>;
    getAllColumns: () => any[];
    getIsAllRowsSelected: () => boolean;
    toggleAllRowsSelected: (value: boolean) => void;
    removeSelectedItems: (selectedItems: ICartItem[]) => void
    totalItems: number;
    selectedItems: ICartItem[];
    totalSelectedAmount: number;
}

interface IDataTableProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: IDataTableContextType
}

export const DataTableContext = React.createContext<IDataTableContextType | null>(null);

const DataTableProvider = ({ children, className, contextValues }: IDataTableProviderProps) => {
    return (
        <DataTableContext.Provider value={contextValues} >
            <div className={cn(className)}>
                {children}
            </div>
        </DataTableContext.Provider>
    );
};

export default DataTableProvider;
