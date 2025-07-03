"use client"
import { useRouter } from "next/navigation";

//store
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
    removeAllItems,
    removeSelectedItems
} from "@/store/cart/stateSlice";

//components
import { Button } from "@/components/ui/atoms";
import ProductItemsListInCart from "./ProductItemsListInCart"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetFooter,
    SheetHeader,
    SheetDescription,
    ScrollArea,
} from "@/components/ui/molecules";


//icons
import { ShoppingCart } from "lucide-react";

//format
import { formatToCurrency } from "@/lib/formats"
import { NotFound } from "@/components/ui/organisms";

export default function DrawerCart() {
    const router = useRouter();

    const dispatch = useAppDispatch();
    const { items, totalAmountDiscount, selectedItems } = useAppSelector((state) => state.cart.state);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button type="button" variant="outline" size="icon" className="relative">
                    <ShoppingCart />
                    <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-1/2 h-1/2 text-sm flex justify-center items-center text-white">
                        {items.length}
                    </span>
                </Button>
            </SheetTrigger>

            <SheetContent className="p-2 w-full h-full">
                <div className="mx-auto w-full flex flex-col justify-between h-full">
                    <SheetHeader className="flex flex-row justify-between mb-3">
                        <div className="flex items-center gap-x-5 w-5/6">
                            <div className="relative">
                                <ShoppingCart size={30} />
                                <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-1/2 h-1/2 text-sm items-center flex justify-center text-white">
                                    {items.length} {/* Display quantity from client-side state */}
                                </span>
                            </div>
                            <div>
                                <SheetTitle className="flex flex-row items-center"> Cart</SheetTitle>
                                <SheetDescription className="text-left line-clamp-1">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula
                                </SheetDescription>
                            </div>
                        </div>
                    </SheetHeader>
                    <ScrollArea className="flex-1">
                        {items && items.length > 0 ? <ProductItemsListInCart data={items} /> : <NotFound />}
                    </ScrollArea>
                    <div className="space-y-2">
                        <SheetFooter>
                            <div className="w-full flex justify-between py-3">
                                <span><strong>Total</strong></span>
                                <span>{formatToCurrency(totalAmountDiscount)} </span>
                            </div>
                        </SheetFooter>
                        <SheetFooter className="justify-end rounded-md space-x-3">
                            <Button variant="default" disabled={items && items.length <= 0} className="w-full" onClick={() => router.push("/cart")}>
                                {items.length > 0 ? `View Cart (${items.length}) ` : "View Cart"}
                            </Button>
                        </SheetFooter>
                        {items && items.length > 0 &&
                            <SheetFooter className="justify-end rounded-md space-x-3">
                                <Button variant="default" className="w-full" onClick={() => router.push("/checkout")}>
                                    Checkout ({formatToCurrency(totalAmountDiscount)})
                                </Button>
                            </SheetFooter>
                        }

                        <SheetFooter className="justify-end rounded-md gap-y-2 gap-x-1">
                            {items.length > 0 && (
                                <Button variant="outline" className="w-full" onClick={() => dispatch(removeAllItems())}>
                                    Clear All
                                </Button>
                            )}
                            {items.length > 0 && selectedItems.length > 0 && (
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => dispatch(removeSelectedItems())} // Truyền selectedItems dưới dạng mảng
                                >
                                    Remove ({selectedItems.length})
                                </Button>
                            )}
                        </SheetFooter>
                    </div>
                </div>
            </SheetContent >
        </Sheet >
    );
}
