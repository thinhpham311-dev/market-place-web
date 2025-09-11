"use client";

import React from "react";

import { cn } from "@/lib/utils"
import { ICartItem, ICart } from "@/interfaces/cart";

interface IShoppingCartContextType {
    cart: ICart;
    addItem: (cartItem: ICartItem) => void;
    // updateItem: (sku_id: string, updates: CartItem) => void;
    removeItem: (sku_id: string) => void;
    removeAllItems: () => void;
    // toggleItemSelection: (sku_id: string) => void;
    removeSelectedItems: () => void;
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
