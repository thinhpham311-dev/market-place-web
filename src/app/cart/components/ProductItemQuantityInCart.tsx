'use client'
import * as React from "react";

//components
import { Counter, ICounterRef } from "@/components/ui";



type Option = {
    label: string;
    value: string | Array<Option>
}

interface IProductItemQuantityInCartProps {
    defaultQuantity: number; // Maximum quantity available
    initialQuantity?: number;
    handleUpdate: (updates: { options?: (Option | null)[]; quantity?: number; }) => void
};

export interface IProductItemQuantityInCartRef {
    validateQuantity: () => string[];
    resetQuantity?: () => void;
    getCurrentQuantity?: () => number;
}


const ProductItemQuantityInCart = React.forwardRef<IProductItemQuantityInCartRef, IProductItemQuantityInCartProps>(({ defaultQuantity, initialQuantity = 0, handleUpdate }, ref) => {
    const counterRef = React.useRef<ICounterRef>(null);
    const [errorMessages, setErrorMessages] = React.useState<string[]>([]);
    const [currentQuantity, setCurrentQuantity] = React.useState<number>(1); // Start with 1

    const validateQuantity = (newQuantity: number) => {
        if (newQuantity > initialQuantity) {
            return [`Quantity exceeds limit: ${initialQuantity}/${newQuantity}`];
        }
        return [];
    };

    React.useImperativeHandle(ref, () => ({
        validateQuantity: () => validateQuantity(currentQuantity),
        getCurrentQuantity: () => currentQuantity,
        resetQuantity: () => {
            setCurrentQuantity(1); // Reset quantity to 1
            counterRef.current?.reset?.(); // Call the reset method on Counter
            setErrorMessages([]);
        },
    }));

    const handleUpdateQuantity = (newQuantity: number) => {
        setCurrentQuantity(newQuantity);
        const errors = validateQuantity(newQuantity);
        setErrorMessages(errors);
        handleUpdate({ quantity: newQuantity, options: undefined });

    };

    return (
        <div>
            <span className="text-xs font-bold">Qty:</span>
            <Counter
                initialValue={defaultQuantity}
                onQuantityChange={handleUpdateQuantity}
            />
            {/* Display error messages */}
            <p className="text-red-500 text-xs basis-full">
                {errorMessages.length > 0 && (
                    <>
                        {
                            errorMessages.map((error, index) => (
                                <span key={index}>{error}</span>
                            ))
                        }
                    </>
                )}
            </p>
        </div>
    );
})

export default React.memo(ProductItemQuantityInCart);
