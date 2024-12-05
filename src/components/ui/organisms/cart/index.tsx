"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

//components
import { Button } from "@/components/ui/atoms"
import {
    TooltipWrapper, Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    ScrollArea
} from "@/components/ui/molecules"
import { CartListItem } from "./item"

//icons
import { ShoppingCart } from "lucide-react"

//datas
import { productData } from "@/constants/data"


export const Cart = () => {
    const router = useRouter()

    return (
        <Sheet>
            <TooltipWrapper content="Cart">
                <SheetTrigger asChild>
                    <Button onClick={() => router.push("/")} variant="outline" size="icon" className="relative after:w-1.5 after:h-1.5 after:bg-red-600 after:absolute after:right-1 after:top-1 after:rounded-lg">
                        <ShoppingCart />
                    </Button>
                </SheetTrigger>
            </TooltipWrapper>
            <SheetContent className=" p-2  w-full md:w-1/2 h-full">
                <div className="mx-auto w-full flex flex-col justify-between h-full">
                    <SheetHeader className="flex flex-row justify-between mb-3">
                        <div className=" flex items-center gap-x-5 px-5">
                            <span><ShoppingCart size={30} /></span>
                            <div>
                                <SheetTitle className="flex flex-row items-center">Detail Cart</SheetTitle>
                                <SheetDescription className="text-left line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula</SheetDescription>
                            </div>
                        </div>
                    </SheetHeader>
                    <ScrollArea className="flex-1">
                        {productData?.map((item, index) => (
                            <CartListItem key={index} item={item} />
                        ))}
                    </ScrollArea>
                    <SheetFooter className="flex flex-row justify-end p-3 border rounded-md space-x-3">
                        <Button variant="outline" >Payment</Button>
                        <SheetClose asChild>
                            <Button variant="outline" >Cancel</Button>
                        </SheetClose>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    )
}

