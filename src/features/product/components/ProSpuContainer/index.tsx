"use client";

//constants
import { PRO_DETAIL } from "@/features/product/constants";
import { useProContext } from "@/features/product/hooks/useProContext";
import SpuRoot from "@/features/spu/spu-root";

interface IProSpuDetailContainerProps {
    children: React.ReactNode
}

export default function ProSpuDetailContainer({ children }: IProSpuDetailContainerProps) {
    const { product_id } = useProContext()

    return (
        <SpuRoot
            storeKey={PRO_DETAIL}
            product_id={product_id}
        >
            {children}
        </SpuRoot>
    );
}
