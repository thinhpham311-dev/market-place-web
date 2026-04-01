"use client";
import React from "react";
import ShopInfoProvider from "../providers";
import ShopInfoWrapper from "../components/ShopInfoWrapper";
import ShopHeader from "../components/ShopHeader";
import ShopStats from "../components/ShopStats";
import ShopActions from "../components/ShopActions";
import ShopVoucherSection from "@/features/voucher/list/components/ShopVoucherSection";
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

  return (
    <Card className="grid grid-cols-12 border-none shadow-none">
      <CardContent className="col-span-12">
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
      </CardContent>
    </Card>
  );
};

export default ShopDetail;
