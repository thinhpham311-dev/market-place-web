"use client";

import React from "react";
import { cn } from "@/utils/styles";
import { IShopModel } from "@/models/shop/shop.model";

interface IShopInfoContextType {
  data?: IShopModel;
  loading: boolean;
  error: string;
  status: "idle" | "loading" | "success" | "error";
}

interface IShopInfoProviderProps {
  children?: React.ReactNode;
  className?: string;
  contextValues: IShopInfoContextType;
}

export const ShopInfoContext = React.createContext<IShopInfoContextType | null>(null);

const ShopInfoProvider: React.FC<IShopInfoProviderProps> = ({
  children,
  className,
  contextValues,
}) => {
  return (
    <ShopInfoContext.Provider value={{ ...contextValues }}>
      <div className={cn(className)}>{children}</div>
    </ShopInfoContext.Provider>
  );
};

export default ShopInfoProvider;
