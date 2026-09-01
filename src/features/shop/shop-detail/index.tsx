"use client";
import React from "react";
import ShopInfoProvider from "../providers";
import ShopInfoWrapper from "../components/ShopInfoWrapper";
import ShopHeader from "../components/ShopHeader";
import ShopStats from "../components/ShopStats";
import ShopActions from "../components/ShopActions";
import ShopVoucherSection from "@/features/voucher/list/components/ShopVoucherSection";
import ProListByShopId from "@/features/product/list/by-shop-id";
import { useFetchData } from "../hooks";
import { Card, CardContent } from "@/components/ui/card";
import { SHOP_DETAIL } from "@/features/shop/shop-detail/constants";

interface IShopProps {
  shop_id?: string;
}

const ShopDetail = ({ shop_id }: IShopProps) => {
  const shopData = useFetchData({
    shop_id,
    storeKey: SHOP_DETAIL,
  });

  const shopBgColor = shopData.shopInfo?.shop_bg_color;
  const shopTextColor = shopData.shopInfo?.shop_text_color;

  return (
    <Card
      className="w-full grid grid-cols-12 border-none shadow-none rounded-none"
      style={{
        ...(shopBgColor ? { backgroundColor: shopBgColor } : {}),
        ...(shopTextColor ? { color: shopTextColor } : {}),
      }}
    >
      <CardContent className="col-span-12 container mx-auto px-4 md:px-6">
        <ShopInfoProvider
          contextValues={{
            data: shopData.shopInfo,
            loading: shopData.loading,
            error: shopData.error,
            status: shopData.status as "idle" | "loading" | "success" | "error",
          }}
        >
          <ShopInfoWrapper>
            <ShopHeader />
            <ShopActions />
            <ShopStats />
          </ShopInfoWrapper>
        </ShopInfoProvider>
        <ShopVoucherSection shopId={shop_id} />
        <ProListByShopId lastId={shop_id} />
      </CardContent>
    </Card>
  );
};

export default ShopDetail;
