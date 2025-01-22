"use client"
import * as React from "react"
import { memo } from "react"

//components
import { Counter, ICounterRef } from "@/components/ui/molecules"


interface IProductItemQuantityProps {
    quantity: number
}

export interface IProductItemQuantityRef {
    validateQuantity: () => void,
    resetQuantity?: () => void;
    getCurrentQuantity?: () => number;
}

const ProductItemQuantity = React.forwardRef<IProductItemQuantityRef, IProductItemQuantityProps>(({ quantity }, ref) => {
    const counterRef = React.useRef<ICounterRef>(null);

    const validateQuantity = () => {
        const quantityCurrent = counterRef.current?.getCount()
        if (quantityCurrent && quantity < quantityCurrent) {
            return [`Quantity exceeds limit: ${quantity}/${quantityCurrent}`];
        }
        return [];
    };

    React.useImperativeHandle(ref, () => ({
        validateQuantity,
        getCurrentQuantity: counterRef.current?.getCount,
        resetQuantity: counterRef.current?.reset
    }));

    return (
        <div className='flex flex-rows flex-wrap gap-3 items-center'>
            <p className='basis-full font-bold'>
                Quantity:
            </p>

            <Counter initialValue={1} ref={counterRef} />
            <p >{quantity} pieces available</p>

        </div>
    );
})


export default memo(ProductItemQuantity)