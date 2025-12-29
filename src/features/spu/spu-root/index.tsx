"use client";

//hooks
import { useFetchData } from "@/features/spu/hooks";

// providers
import SpuProvider from "@/features/spu/providers";

interface ISpuDetailWrapperProps {
  children?: React.ReactNode;
  storeKey: string;
  product_id: string;
}

export default function SpuRoot({ children, storeKey, product_id }: ISpuDetailWrapperProps) {
  const spuData = useFetchData({
    product_id,
    storeKey,
  });

  return <SpuProvider contextValues={{ ...spuData }}>{children}</SpuProvider>;
}
