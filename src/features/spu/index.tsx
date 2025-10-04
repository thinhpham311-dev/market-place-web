"use client";

//hooks
import { useFetchData } from "./hooks";

// providers
import SpuProvider from "./providers";


interface ISpuDetailWrapperProps {
    children?: React.ReactNode;
    storeKey: string
    product_id: string
}

export default function SpuDetailWrapper(
    { children, storeKey, product_id }: ISpuDetailWrapperProps
) {

    const spuData = useFetchData({
        product_id,
        storeKey
    })


    return (
        <SpuProvider contextValues={{ ...spuData }}>
            {children}
        </SpuProvider>
    );
}
