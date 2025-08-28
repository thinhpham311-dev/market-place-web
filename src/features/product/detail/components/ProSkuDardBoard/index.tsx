"use client";

import * as React from "react";

import { useFetchData } from "./hooks";
import ProSkuDardBoardProvider from "./providers";
import { selectVariantsStoreKey } from "../../components/ProVariantsSelector/store/selectors"
import { useAppSelector } from "@/lib/hooks";

interface IProSkuDardBoardProps {
    storeKey: string;
    product_id?: string;
    children?: React.ReactNode;
}

const ProSkuDardBoard = (({ storeKey, product_id = "", children }: IProSkuDardBoardProps) => {
    const { sku_tier_idx } = useAppSelector(selectVariantsStoreKey(storeKey));
    const skuData = useFetchData({ storeKey, product_id, sku_tier_idx });
    return (
        <ProSkuDardBoardProvider contextValues={skuData}>
            {children}
        </ProSkuDardBoardProvider>
    );
});

export default ProSkuDardBoard;
