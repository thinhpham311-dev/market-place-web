"use client";

//constants
import { PRO_DETAIL } from "@/features/product/constants";
import { useProContext } from "@/features/product/hooks/useProContext";
import SpuDetailWrapper from "@/features/spu";

interface IProSpuDetailContainerProps {
    children: React.ReactNode
}

export default function ProSpuDetailContainer({ children }: IProSpuDetailContainerProps) {
    const { product_id } = useProContext()

    return (
        <SpuDetailWrapper
            storeKey={PRO_DETAIL}
            product_id={product_id}
        >
            {children}
        </SpuDetailWrapper>
    );
}
