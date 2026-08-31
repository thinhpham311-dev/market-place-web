"use client";
import React from "react";
import { Item } from "@/components/ui/item";
import { useShopInfoContext } from "../hooks";

interface ShopInfoWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ShopInfoWrapper = ({ children, className, style }: ShopInfoWrapperProps) => {
  const { data } = useShopInfoContext();
  const articleBgColor = data?.shop_article_bg_color || data?.shop_bg_color;
  const articleTextColor = data?.shop_article_text_color || data?.shop_text_color;

  return (
    <Item
      variant="outline"
      className={`flex rounded-none items-center border-none flex-row py-5 ${className || ""}`}
      style={{
        ...(articleBgColor ? { backgroundColor: articleBgColor } : {}),
        ...(articleTextColor ? { color: articleTextColor } : {}),
        ...style,
      }}
    >
      {children}
    </Item>
  );
};

export default ShopInfoWrapper;
