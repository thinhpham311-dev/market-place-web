"use client";

import {
    Button,
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    ScrollArea
} from "@/components/ui";

import { ShoppingCart } from "lucide-react";
import { useShoppingCartContext } from "@/features/cart/hooks";


export default function ShoppingCartTrigger({ children }: { children: React.ReactNode }) {
    const { cart } = useShoppingCartContext();
    const totalItems = cart?.items?.length || 0;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button type="button" variant="outline" size="icon" className="relative">
                    <ShoppingCart />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-1/2 h-1/2 text-sm flex justify-center items-center text-white">
                            {totalItems}
                        </span>
                    )}
                </Button>
            </SheetTrigger>

            <SheetContent className="p-3">
                <div className="flex flex-col h-full">
                    <SheetHeader>
                        <SheetTitle className="uppercase">
                            Cart
                        </SheetTitle>
                        <SheetDescription>
                            Your shopping cart items and checkout options
                        </SheetDescription>
                    </SheetHeader>
                    <ScrollArea className="flex-1">
                        {children}
                    </ScrollArea>
                    <SheetFooter>
                        <Button className="w-full" size="lg">Checkout ${cart.totalAmount}</Button>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet >
    );
}
