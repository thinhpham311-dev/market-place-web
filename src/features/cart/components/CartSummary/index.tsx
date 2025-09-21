import React from 'react';
import { Card, CardContent, ScrollArea } from '@/components/ui';
import CartItem from "../CartItem"
import { useShoppingCartContext } from '../../hooks';
// import Loading from "./Loading"
import NotFound from './NotFound';

const CartSummary = () => {
    const { cart } = useShoppingCartContext()
    const { items } = cart
    const hasNoData = !items || items.length === 0;

    // if (isLoading && hasNoData) {
    //     return <Loading className={className} count={countLoadItems} />;
    // }

    // if (!isLoading && hasNoData && error) {
    //     return <NotFound message={error.message || "Something went wrong."} />;
    // }

    if (hasNoData) {
        return <NotFound />;
    }

    return (
        <Card className='border-none shadow-none '>
            <CardContent className='p-0'>
                <ScrollArea className=" aspect-square">
                    <ul className='space-y-1'>
                        {items.map(item => (
                            <li key={item.itemId}>
                                <CartItem data={item} />
                            </li>
                        ))}
                    </ul>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default CartSummary;
