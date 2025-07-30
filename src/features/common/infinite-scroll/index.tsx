'use client';
import InfiniteScrollProvider from "./providers";
import InfiniteScrollWrapper from "./components/InfiniteScrollWrapper";
import { Product } from "@/features/product/types";
import { useHandleInfiniteScroll } from "./hooks";

export interface IInfiniteScrollProps {
    storeKey: string;
    products?: Product[];
}


export default function InfiniteScroll({
    storeKey,
}: IInfiniteScrollProps) {
    const infiniteScroll = useHandleInfiniteScroll({
        storeKey
    })
    return (
        <InfiniteScrollProvider contextValues={infiniteScroll}>
            <InfiniteScrollWrapper>
                <p>Not Found</p>
            </InfiniteScrollWrapper>
        </InfiniteScrollProvider>
    );
}
