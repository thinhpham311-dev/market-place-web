"use client";

import { useEffect, useMemo, useState } from "react";

import ApiService from "@/services/ApiService";
import type { IShopModel } from "@/models/shop";

type SidebarShopsResponse = {
  metadata?: {
    list?: IShopModel[];
  };
};

export function useSidebarShops(limit = 8) {
  const [shops, setShops] = useState<IShopModel[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchShops = async () => {
      try {
        const response = await ApiService.fetchData<SidebarShopsResponse>({
          url: "/shop/active-list",
          method: "GET",
          params: { limit },
        });
        const shopList = response.data?.metadata?.list ?? [];

        if (isMounted) {
          setShops(shopList);
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
