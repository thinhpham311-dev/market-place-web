"use client"
import {
    Separator,
    CardDescription,
} from "@/components/ui";
import { formatToCurrency } from "@/lib/formats"

//icons
import { CircleHelp } from "lucide-react"

interface IOrderSummaryProps {
    totalAmount: number;
    totalAmountDiscount: number;
    estimatedShipping: number;
    estimatedTax: number;
    total: number;
};

export default function OrderSummary({
    totalAmount,
    totalAmountDiscount,
    estimatedShipping,
    estimatedTax,
    total
}: IOrderSummaryProps) {

    return (
        <div className="space-y-5">
            <CardDescription className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                    <strong>Sub Total</strong>
                </div>
                <span>{formatToCurrency(totalAmount)}</span>
            </CardDescription>
            <CardDescription className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                    <strong>Discount Total</strong>
                    <CircleHelp size={20} />
                </div>
                <span>
                    {formatToCurrency(totalAmountDiscount)}
                </span>
            </CardDescription>
            <CardDescription className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                    <strong>Estimated Shipping</strong>
                </div>
                <span>
                    {formatToCurrency(estimatedShipping)}
                </span>
            </CardDescription>
            <CardDescription className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                    <strong>Estimated Tax</strong>
                    <CircleHelp size={20} />
                </div>
                <span>
                    {formatToCurrency(estimatedTax)}
                </span>
            </CardDescription>
            <Separator />
            <CardDescription className="flex items-center justify-between">
                <div className="flex space-x-2 items-center">
                    <strong>Total</strong>
                </div>
                <strong>{formatToCurrency(total)}</strong>
            </CardDescription>
        </div>
    );
} 