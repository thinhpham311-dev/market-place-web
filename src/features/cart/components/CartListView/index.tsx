"use client";
import React from 'react';
import { Card, CardContent, ScrollArea } from '@/components/ui';
import { ICartItem } from "@/interfaces/cart"
import CartItem from '@/features/cart/components/CartItem';
import LoadingSkeleton from "./Loading"
import NotFound from './NotFound';

interface ICartListViewProps {
    data: ICartItem[]
    countLoadItems: number;
    isLoading: boolean;
    error: Error | null;
}

const CartListView = ({ data = [], countLoadItems = 0, isLoading = false, error }: ICartListViewProps) => {

    const hasNoData = !data || data.length === 0;

    if (isLoading && hasNoData) {
        return <LoadingSkeleton count={countLoadItems} />;
    }

    if (!isLoading && hasNoData && error) {
        return <NotFound message={error.message || "Something went wrong."} />;
    }

    if (hasNoData) {
        return <NotFound />;
    }

    return (
        <Card className='border-none shadow-none '>
            <CardContent className='p-0'>
                <ScrollArea className=" aspect-square">
                    <ul className='space-y-1'>
                        {data.map(item => (
                            <li key={item.itemSkuId}>
                                <CartItem data={item} />
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default CartListView;
