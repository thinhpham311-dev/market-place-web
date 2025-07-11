'use client'
import * as React from "react";

//ui
import { Counter, ICounterRef } from "@/components/ui";

//types
import { IOption } from "@/interfaces/product";


interface IProductItemQuantityInCartProps {
    defaultQuantity: number; // Maximum quantity available
    initialQuantity?: number;
    handleUpdate: (updates: { options?: (IOption | null)[]; quantity?: number; }) => void
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
        <div className="flex flex-rows flex-wrap gap-x-3 items-center">
            <Counter
                initialValue={defaultQuantity}
                onQuantityChange={handleUpdateQuantity}
            />
            <span className="text-xs">{initialQuantity} pieces available</span>
            {/* Display error messages */}
            {errorMessages.length > 0 && (
                <p className="text-red-500 text-xs basis-full">
                    {errorMessages.map((error, index) => (
                        <span key={index}>{error}</span>
                    ))}
                </p>
            )}
        </div>
    );
})

export default React.memo(ProductItemQuantityInCart);
