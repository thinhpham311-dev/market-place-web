import React, { useState } from 'react';
import { Card, CardContent, CardTitle, Button, Input, CardDescription } from '@/components/ui';

const CartCoupon = () => {
    const [couponCode, setCouponCode] = useState<string>('');
    const [discount, setDiscount] = useState<number | null>(null);

    const applyCoupon = () => {
        if (couponCode === 'SAVE10') {
            setDiscount(10);
        } else {
            setDiscount(0);
        }
    };

    return (
        <Card>
            <CardContent className='p-3'>
                <CardTitle>Apply Coupon</CardTitle>
                <Input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                />
                <Button variant="outline" onClick={applyCoupon}>Apply</Button>
                {discount !== null && (
                    <CardDescription>{discount > 0 ? `Discount applied: $${discount}` : 'Invalid coupon code'}</CardDescription>
                )}
            </CardContent>
        </Card>
    );
};

export default CartCoupon;
