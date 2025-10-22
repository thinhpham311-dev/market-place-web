"use client";

import React from "react";

import { cn } from "@/lib/utils"
import { ICart, ICartItem } from "@/interfaces/cart";

interface IShoppingCartContextType {
    data: ICart;
    loading: boolean,
    error: Error | null,
    status: "idle" | "loading" | "success" | "error",
    addItem: (cartItem: ICartItem) => void;
    updateItem: (sku_id: string, quantity: number) => void;
    removeItem: (sku_id: string) => void;
    removeAllItems: () => void;
    removeSelectedItems: (selectedItems: ICartItem[]) => void;
}

interface IShoppingCartProviderProps {
    children?: React.ReactNode;
    className?: string;
    contextValues: IShoppingCartContextType
}

export const ShoppingCartContext = React.createContext<IShoppingCartContextType | null>(null);

const ShoppingCartProvider = ({ children, className, contextValues }: IShoppingCartProviderProps) => {
    return (
        <ShoppingCartContext.Provider value={contextValues} >
            <div className={cn(className)}>
                {children}
            </div>
        </ShoppingCartContext.Provider>
    );
};

export default ShoppingCartProvider;
