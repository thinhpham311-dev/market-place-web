import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { useShopInfoContext } from '../hooks';

const ShopInfo = () => {
    const { shopInfo } = useShopInfoContext();
    const { shop_name, shop_email } = shopInfo || {};
    return (
        <Card className='border-none shadow-none'>
            <CardContent className='p-3'>
                <h1>{shop_name}</h1>
                <p>{shop_email}</p>
                <p>More shop details can be added here.</p>
            </CardContent>
        </Card>
    );
};

export default ShopInfo;
