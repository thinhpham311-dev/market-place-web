"use client"

import * as React from "react"

//components
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import List from "@/components/list"
import CardDetail from "./card"
import TooltipElement from "../tooltip"

//icons
import { ShoppingCart, Expand } from "lucide-react"

//datas
import { productData } from "@/constants/data"


const DrawerToggle = () => {
    return (
        <Drawer>
            <TooltipElement content="Cart">
                <DrawerTrigger asChild>
                    <Button variant="outline" size="icon" className="relative after:w-1.5 after:h-1.5 after:bg-red-600 after:absolute after:right-1 after:top-1 after:rounded-lg">
                        <ShoppingCart />
                    </Button>
                </DrawerTrigger>
            </TooltipElement>
            <DrawerContent className="md:mx-10 mx-0">
                <div className="mx-auto w-full">
                    <DrawerHeader className="flex flex-row justify-between py-0">
                        <div className="px-0 flex items-center gap-x-3">
                            <span><ShoppingCart size={30} /></span>
                            <div>
                                <DrawerTitle className="flex flex-row items-center">Detail Cart</DrawerTitle>
                                <DrawerDescription className="text-left md:line-clamp-2 line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula</DrawerDescription>
                            </div>
                        </div>
                        <TooltipElement content="Refresh to payment detail page">
                            <Button variant="outline" size="icon"><Expand /></Button>
                        </TooltipElement>
                    </DrawerHeader>
                    <div className="p-4 pb-0 grid lg:grid-cols-6 grid-cols-1 gap-5">
                        <div className="lg:col-span-4 col-span-6">
                            <List title="Products List" type="row" data={productData} />
                        </div>
                        <CardDetail />
                    </div>
                    <DrawerFooter className="flex flex-row justify-end">
                        <Button variant="outline" size="sm">Payment</Button>
                        <DrawerClose asChild>
                            <Button variant="outline" size="sm">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default DrawerToggle
