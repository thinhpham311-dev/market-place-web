import React from 'react';
import { useShopInfoContext } from '@/features/shop/hooks';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui';

const ProShopInfo = () => {
    const { shopInfo } = useShopInfoContext();
    const { shop_name, shop_email, shop_address, shop_phone } = shopInfo || {};
    return (
        <Card >
            <CardContent className='p-3'>
                <CardTitle className='text-lg'>{shop_name}</CardTitle>
                <CardDescription>{shop_email}</CardDescription>
                <CardDescription>{shop_address}</CardDescription>

                <CardDescription>{shop_phone}</CardDescription>

            </CardContent>
        </Card>
    );
};

export default ProShopInfo;
