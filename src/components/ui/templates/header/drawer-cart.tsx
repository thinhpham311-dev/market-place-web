"use client"
import { useRouter } from "next/navigation";

//store
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { removeAllItems, removeSelectedItems } from "@/store/order/cartSlice"

//components
import { Button } from "@/components/ui/atoms";
import { RowList } from "@/components/ui/organisms"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
    SheetFooter,
    SheetHeader,
    SheetDescription,
    ScrollArea,
} from "@/components/ui/molecules"


//icons
import { ShoppingCart } from "lucide-react"

export default function DrawerCart() {
    const dispatch = useAppDispatch()
    const { items, totalAmountDiscount, totalQuantity, selectedItems } = useAppSelector((state) => state.order.cart);
    const router = useRouter()

    const handleRemoveAllItems = () => {
        dispatch(removeAllItems())
    }

    const handleRemoveSelectedItems = () => {
        setTimeout(() => {
            dispatch(removeSelectedItems(selectedItems));
        }, 500)
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button onClick={() => router.push("/")} variant="outline" size="icon" className="relative  ">
                    <ShoppingCart /><span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-1/2 h-1/2 text-sm flex justify-center items-center text-white">{totalQuantity}</span>
                </Button>
            </SheetTrigger>

            <SheetContent className=" p-2  w-full h-full">
                <div className="mx-auto w-full flex flex-col justify-between h-full">
                    <SheetHeader className="flex flex-row justify-between mb-3">
                        <div className=" flex items-center gap-x-5 w-5/6 ">
                            <div className="relative">
                                <ShoppingCart size={30} />
                                <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-1/2 h-1/2 text-sm  items-center flex justify-center text-white">{totalQuantity}</span>
                            </div>
                            <div>
                                <SheetTitle className="flex flex-row items-center"> Cart</SheetTitle>
                                <SheetDescription className="text-left line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula</SheetDescription>
                            </div>
                        </div>
                    </SheetHeader>
                    <ScrollArea className="flex-1">
                        <RowList data={items} />
                    </ScrollArea>
                    <div className="space-y-2">
                        <SheetFooter>
                            <div className="w-full flex justify-between">
                                <span><strong>Total</strong></span>
                                <span>{totalAmountDiscount}</span>
                            </div>

                        </SheetFooter>
                        <SheetFooter className="justify-end rounded-md space-x-3">
                            <Button variant="default" className="w-full" onClick={() => router.push("/cart")}>Check Out</Button>
                        </SheetFooter>
                        <SheetFooter className="justify-end  rounded-md space-x-3">
                            <Button variant="outline" className="w-full" onClick={handleRemoveAllItems}> Clear All</Button>
                            {selectedItems.length > 0 ? <Button variant="outline" className="w-full" onClick={handleRemoveSelectedItems}>Remove({selectedItems.length})</Button> : <></>}
                        </SheetFooter>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}