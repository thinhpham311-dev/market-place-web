"use client";

import React from "react";

import { cn } from "@/lib/utils"
import { ICartItem, ICart } from "@/interfaces/cart";
import { ILoadingState, IErrorState } from "@/features/cart/types"

interface IShoppingCartContextType {
    data: ICart;
    loading: ILoadingState,
    error?: IErrorState,
    createItem: (item: ICartItem) => void;
    updateVariantsItem: (item: ICartItem) => void;
    updateQtyItem: (item: ICartItem) => void;
    setItemsSelected: (items: ICartItem[]) => void;
    deleteItem: (item: ICartItem) => void;
    deleteItemsAll: () => void;
    deleteItemsSelected: (items: ICartItem[]) => void;
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
