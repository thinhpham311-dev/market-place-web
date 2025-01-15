"use client"
import * as React from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { removeSelectedItems, removeAllItems } from "@/store/cart/stateSlice";

// components
import { Button } from "@/components/ui/atoms";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/molecules";
import ProductItemsListInCart from "./ProductItemsListInCart"
import OrderSummary from "./OrderSummary"
import OptionsListOfPayment from "./OptionsListOfPayment"

// icons
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { NotFound } from "@/components/ui/organisms";

type ShoppingCartHeaderProps = {
    itemsCount: number;
    onBack: () => void;
};

const ShoppingCartHeader: React.FC<ShoppingCartHeaderProps> = ({ itemsCount, onBack }) => (
    <div className="flex items-center gap-x-5 w-5/6">
        <Button className="flex-none" variant="outline" size="icon" onClick={onBack}><ArrowLeft /></Button>
        <div className="flex-none relative">
            <ShoppingCart size={30} />
            {itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-1/2 h-1/2 text-sm items-center flex justify-center text-white">{itemsCount}</span>
            )}
        </div>
        <div className="grow flex-1">
            <h2 className="flex flex-row items-center">Cart</h2>
            <p className="text-left line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula</p>
        </div>
    </div>
);

export default function DetailCart() {
    const dispatch = useAppDispatch();
    const {
        selectedItems,
        items,
        totalAmount,
        totalAmountDiscount,
        estimatedShipping,
        estimatedTax,
        total
    } = useAppSelector((state) => state.cart.state);
    const router = useRouter();

    const handleRemoveSelectedItems = () => {
        setTimeout(() => {
            dispatch(removeSelectedItems(selectedItems));
        }, 500);
    };

    const handleRemoveAllItems = () => {
        dispatch(removeAllItems());
    };

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 md:px-6 px-3">
            <div className="lg:col-span-2 md:col-span-1 col-span-1">
                <Card className="w-full border-none h-full shadow-none">
                    <CardContent className="w-full h-full p-0">
                        <div className="mx-auto w-full h-full">
                            <CardHeader className="mb-3 p-0">
                                <ShoppingCartHeader itemsCount={items.length} onBack={() => router.back()} />
                            </CardHeader>
                            <CardContent className="flex items-center justify-between p-0">
                                {items && items.length > 0 ? <ProductItemsListInCart data={items} /> : <NotFound />}
                            </CardContent>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-1 md:col-span-1 col-span-1 h-full">
                <Card className="border-none gap-y-10 sticky top-[80px]">
                    <CardHeader className="grid grid-rows-2 grid-flow-col p-0 justify-between items-start">
                        <CardTitle className="col-span-1 row-span-1">
                            In Your Bag
                        </CardTitle>
                        <CardDescription className="col-span-1 row-span-1">
                            Lorem ipsum dolor sit amet
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5 p-0">
                        <OrderSummary
                            totalAmount={totalAmount}
                            totalAmountDiscount={totalAmountDiscount}
                            estimatedShipping={estimatedShipping}
                            estimatedTax={estimatedTax}
                            total={total}
                        />
                        <OptionsListOfPayment
                            onCheckout={() => router.push("/checkout")}
                            onPayPal={() => { }}
                            onRemoveSelected={handleRemoveSelectedItems}
                            onRemoveAll={handleRemoveAllItems}
                            selectedItemsCount={selectedItems.length}
                            itemsCount={items.length}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
