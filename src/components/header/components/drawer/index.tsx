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
import ScrollAreaList from "./scrollAreaList"
import CardDetail from "./card"
import TooltipElement from "../tooltip"
//icons
import { ShoppingCart, Expand } from "lucide-react"


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
            <DrawerContent >
                <div className="mx-auto w-full">
                    <DrawerHeader className="flex flex-row justify-between py-0">
                        <div className="px-5">
                            <DrawerTitle className="flex flex-row gap-x-2 items-center mb-3"><span><ShoppingCart /></span>Detail Cart</DrawerTitle>

                            <DrawerDescription className="text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula</DrawerDescription>
                        </div>
                        <TooltipElement content="Refresh to payment detail page">
                            <Button variant="outline" size="icon"><Expand /></Button>
                        </TooltipElement>
                    </DrawerHeader>
                    <div className="p-4 pb-0 grid lg:grid-cols-6 grid-cols-1 gap-5">
                        <ScrollAreaList />
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
