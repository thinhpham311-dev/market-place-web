"use client";

//constants
import { PRO_DETAIL } from "@/features/product/constants";
import SkuRoot from "@/features/sku/sku-root";
import { useAppSelector } from "@/lib/hooks";
import { selectOptionsStoreKey } from "@/features/common/option-selector/store/selectors"

interface IProSkuDetailContainerProps {
    product_id: string;
    children: React.ReactNode
}

export default function ProSkuDetailContainer({ product_id, children }: IProSkuDetailContainerProps) {
    const { option_idx, optionsCount } = useAppSelector(selectOptionsStoreKey(PRO_DETAIL))

    return (
        <SkuRoot
            storeKey={PRO_DETAIL}
            product_id={product_id}
            sku_tier_idx={option_idx}
            optionsCount={optionsCount}
        >
            {children}
        </SkuRoot>
    );
}
