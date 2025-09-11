'use client';
import InfiniteScrollProvider from "./providers";
import InfiniteScrollWrapper from "./components/InfiniteScrollWrapper";
import { ISpuPro } from "@/interfaces/spu";
import { useHandleInfiniteScroll } from "./hooks";

export interface IInfiniteScrollProps {
    storeKey: string;
    products?: ISpuPro[];
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
