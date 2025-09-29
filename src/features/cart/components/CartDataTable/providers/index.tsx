"use client";

import React from "react";
import { cn } from "@/lib/utils"
import { HeaderGroup, RowModel } from "@tanstack/react-table";
import { ICartItem } from "@/interfaces/cart";

interface ICartDataTableContextType {
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

interface ICartDataTableProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: ICartDataTableContextType
}

export const CartDataTableContext = React.createContext<ICartDataTableContextType | null>(null);

const CartDataTableProvider = ({ children, className, contextValues }: ICartDataTableProviderProps) => {
    return (
        <CartDataTableContext.Provider value={contextValues} >
            <div className={cn(className)}>
                {children}
            </div>
        </CartDataTableContext.Provider>
    );
};

export default CartDataTableProvider;
