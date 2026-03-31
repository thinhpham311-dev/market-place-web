"use client";

import { useEffect, useMemo, useState } from "react";

import ApiService from "@/services/ApiService";
import type { IShopModel } from "@/models/shop";
import type { ISpuModel } from "@/models/spu";

type SidebarShopsResponse = {
  data?: {
    metadata?: {
      list?: ISpuModel[];
    };
  };
};

export function useSidebarShops(limit = 24) {
  const [shops, setShops] = useState<IShopModel[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchShops = async () => {
      try {
        const response = (await ApiService.fetchData({
          url: "/spu/all",
          method: "POST",
          data: {
            limit,
            page: 1,
            sort: "ctime",
          },
        })) as SidebarShopsResponse;

        const products = response?.data?.metadata?.list ?? [];
        const uniqueShops = new Map<string, IShopModel>();

        products.forEach((product) => {
          const shop = product?.product_shop;

          if (shop?.shop_id && !uniqueShops.has(shop.shop_id)) {
            uniqueShops.set(shop.shop_id, shop);
          }
        });

        if (isMounted) {
          setShops(Array.from(uniqueShops.values()).slice(0, 8));
        }
      } catch {
        if (isMounted) {
          setShops([]);
        }
      }
    };

    void fetchShops();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return useMemo(() => ({ shops }), [shops]);
}
