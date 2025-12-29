"use client";

import React from "react";

import SkuProvider from "@/features/sku/providers";

import { useFetchData } from "@/features/sku/hooks";

interface ISkuRootProps {
  children?: React.ReactNode;
  storeKey: string;
  sku_tier_idx: number[];
  product_id: string;
  optionsCount: number;
}

export default function SkuRoot({ children, storeKey, ...rest }: ISkuRootProps) {
  const skuData = useFetchData({
    storeKey,
    ...rest,
  });

  return <SkuProvider contextValues={{ ...skuData }}>{children}</SkuProvider>;
}
