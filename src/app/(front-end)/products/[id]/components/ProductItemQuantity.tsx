"use client"
import * as React from "react"
import { memo } from "react"

//components
import { Counter, ICounterRef } from "@/components/ui/molecules"

interface IProductItemQuantityProps {
    quantity: number; // Maximum quantity available
}

export interface IProductItemQuantityRef {
    validateQuantity: () => string[];
    resetQuantity?: () => void;
    getCurrentQuantity?: () => number;
}

const ProductItemQuantity = React.forwardRef<IProductItemQuantityRef, IProductItemQuantityProps>(
    ({ quantity }, ref) => {
        const counterRef = React.useRef<ICounterRef>(null);
        const [errorMessages, setErrorMessages] = React.useState<string[]>([]);
        const [currentQuantity, setCurrentQuantity] = React.useState<number>(1); // Start with 1

        const validateQuantity = (newQuantity: number) => {
            if (newQuantity > quantity) {
                return [`If more quantity is added, purchase limit will be exceeded and price may change`];
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

        const handleQuantityChange = (newQuantity: number) => {
            setCurrentQuantity(newQuantity);
            const errors = validateQuantity(newQuantity);
            setErrorMessages(errors);
        };

        return (
            <div className="flex flex-rows flex-wrap gap-3 items-center">
                <p className="basis-full font-bold">Quantity:</p>

                {/* Counter with an onChange prop to track the current quantity */}
                <Counter
                    initialValue={1}
                    ref={counterRef}
                    onQuantityChange={handleQuantityChange} // Assume Counter supports this
                />
                <p>{quantity} pieces available</p>

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
    }
);

export default memo(ProductItemQuantity);
