"use client";

//hooks
import { useFetchData } from "./hooks";
import { useProContext } from "../hooks/useProContext";

// providers
import SpuProvider from "./providers";
import { SPU_KEY } from "@/features/product/spu/constants";


export default function SpuDetailWrapper(
    { children }: { children?: React.ReactNode; }
) {
    const { product_id = "" } = useProContext();

    const spuData = useFetchData({
        product_id,
        storeKey: SPU_KEY
    })


    return (
        <SpuProvider contextValues={{ ...spuData }}>
            {children}
        </SpuProvider>
    );
}
