"use client";

//constants
import { PRO_DETAIL } from "@/features/product/constants";
import { useProContext } from "@/features/product/hooks/useProContext";
import SkuRoot from "@/features/sku/sku-root";
import { useSpuContext } from "@/features/spu/hooks";
import LoadingSkeleton from "./Loading"
import NotFound from "./NotFound"

interface IProSkuDetailContainerProps {
    children: React.ReactNode
}

export default function ProSkuDetailContainer({ children }: IProSkuDetailContainerProps) {
    const { product_id, sku_tier_idx, optionsCount } = useProContext()
    const spuContext = useSpuContext()
    const { spu, loading, error } = spuContext
    const hasNoData = !spu || Object.keys(spu).length === 0;
    if (loading && hasNoData) {
        return <LoadingSkeleton />;
    }

    if (!loading && hasNoData && error) {
        return <NotFound message={error || "Something went wrong."} />;
    }

    if (!loading && hasNoData) {
        return <NotFound />;
    }
    return (
        <SkuRoot
            storeKey={PRO_DETAIL}
            product_id={product_id}
            sku_tier_idx={sku_tier_idx}
            optionsCount={optionsCount}
        >
            {children}
        </SkuRoot>
    );
}
