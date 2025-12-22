"use client";

import React from "react";

import { cn } from "@/utils/styles"
import { ICartItemModel, ICartModel } from "@/models/cart";
import { ILoadingState, IErrorState } from "@/features/cart/types"

interface IShoppingCartContextType {
    data: ICartModel;
    loading: ILoadingState,
    error?: IErrorState,
    createItem: (item: ICartItemModel) => void;
    updateVariantsItem: (item: ICartItemModel) => void;
    updateQtyItem: (item: ICartItemModel) => void;
    setItemsSelected: (items: ICartItemModel[]) => void;
    deleteItem: (item: ICartItemModel) => void;
    deleteItemsAll: () => void;
    deleteItemsSelected: (items: ICartItemModel[]) => void;
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
