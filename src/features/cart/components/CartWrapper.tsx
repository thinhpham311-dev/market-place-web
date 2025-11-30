import React from 'react';
import { Card, CardContent } from '@/components/ui/card';


const CartWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <Card className='border-none shadow-none'>
            <CardContent className='p-0'>
                {children}
            </CardContent>
        </Card>
    );
};

export default CartWrapper;
