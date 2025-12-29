"use client";

//constants
import { PRO_DETAIL } from "@/features/product/constants";
import SkuRoot from "@/features/sku/sku-root";
import { useGetOptionSelectorValue } from "@/features/common/option-selector/hooks";

interface IProSkuDetailContainerProps {
  product_id: string;
  children: React.ReactNode;
}

export default function ProSkuDetailContainer({
  product_id,
  children,
}: IProSkuDetailContainerProps) {
  const { selectedOptions, optionsCount } = useGetOptionSelectorValue({
    storeKey: `${PRO_DETAIL}_${product_id}`,
  });
  return (
    <SkuRoot
      storeKey={PRO_DETAIL}
      product_id={product_id}
      sku_tier_idx={selectedOptions}
      optionsCount={optionsCount}
    >
      {children}
    </SkuRoot>
  );
}
