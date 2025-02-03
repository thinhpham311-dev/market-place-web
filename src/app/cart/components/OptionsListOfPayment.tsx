"use client"
import { Button } from "@/components/ui/atoms";
import { FaCcPaypal } from "react-icons/fa"

interface IOptionsListOfPaymentProps {
    onCheckout: () => void;
    onPayPal: () => void;
    onRemoveSelected: () => void;
    onRemoveAll: () => void;
    selectedItemsCount: number;
    itemsCount: number;
};

export default function OptionsListOfPayment({
    onCheckout,
    onPayPal,
    onRemoveSelected,
    onRemoveAll,
    selectedItemsCount,
    itemsCount
}: IOptionsListOfPaymentProps) {
    return (
        <div className="space-y-2">
            <Button className="w-full rounded-full" onClick={onCheckout}>Checkout</Button>
            <Button className="w-full rounded-full" onClick={onPayPal}>
                <span><FaCcPaypal /></span> Pay Pal
            </Button>
            {selectedItemsCount > 0 &&
                <Button variant="outline" className="w-full rounded-full" onClick={onRemoveSelected}>
                    Remove({selectedItemsCount})
                </Button>
            }
            {itemsCount > 0 &&
                <Button variant="outline" className="w-full rounded-full" onClick={onRemoveAll}>
                    Clear All
                </Button>
            }
        </div>
    )
}