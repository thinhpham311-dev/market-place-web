import React from 'react';
import { Button } from '@/components/ui';
import { useShoppingCartContext } from "@/features/cart/hooks";
import { formatToCurrency } from '@/lib/formats/formatToCurrency';
import { CreditCard } from "lucide-react"

const MiniCartFooter = () => {
    const { data } = useShoppingCartContext();
    const total_price = data?.cart_total_price ?? 0;

    return (
        <div className="flex justify-between items-center p-0 space-y-0">
            <div className="flex items-center">
                <span className="text-md font-bold">{formatToCurrency(total_price)}</span>
            </div>
            <Button className="flex items-center" variant="default" size="sm" >
                <CreditCard /> <span>Check Out</span>
            </Button>
        </div>
    );
};

export default MiniCartFooter;
