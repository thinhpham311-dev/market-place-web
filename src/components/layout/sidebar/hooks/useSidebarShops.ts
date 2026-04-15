"use client";

import { useMemo } from "react";
import useSWR from "swr";

import ApiService from "@/services/ApiService";
import type { IShopModel } from "@/models/shop";

type SidebarShopsResponse = {
  metadata?: {
    list?: IShopModel[];
  };
};

const fetchShops = async ([url, limit]: readonly [string, number]) => {
  const response = await ApiService.fetchData<SidebarShopsResponse>({
    url,
    method: "GET",
    params: { limit },
  });
  return response.data?.metadata?.list ?? [];
};

export function useSidebarShops(limit = 8) {
  const { data: shops = [] } = useSWR(["/shop/active-list", limit], fetchShops, {
    revalidateOnFocus: false, // Optional: Avoid excessive re-fetches when window gains focus
  });

  return useMemo(() => ({ shops }), [shops]);
}
