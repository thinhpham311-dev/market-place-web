"use client";

//constants
import { PRO_DETAIL } from "@/features/product/constants";
import SpuRoot from "@/features/spu/spu-root";

interface IProSpuDetailContainerProps {
    product_id: string;
    children: React.ReactNode
}

export default function ProSpuDetailContainer({ product_id, children }: IProSpuDetailContainerProps) {

    return (
        <SpuRoot
            storeKey={PRO_DETAIL}
            product_id={product_id}
        >
            {children}
        </SpuRoot>
    );
}
