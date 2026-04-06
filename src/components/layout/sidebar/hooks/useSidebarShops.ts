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
          url: "/shop/active-list",
          method: "GET",
          params: { limit },
        })) as any;

        let shopList = [];
      
           shopList = response.data.metadata.list;
   

        if (isMounted) {
          setShops(shopList.slice(0, 8));
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
