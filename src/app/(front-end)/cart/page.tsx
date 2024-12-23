'use client'
import * as React from "react"
import { useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/lib/hooks"
import { removeSelectedItems, removeAllItems } from "@/store/cart/stateSlice"

// components
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    ScrollArea,
} from "@/components/ui/molecules"
import { Separator, Button } from "@/components/ui/atoms"
import { CarouselList, RowListCounter } from "@/components/ui/organisms"

// icons
import { CircleHelp, FilePenLine, ArrowRight, ArrowLeft, ShoppingCart } from "lucide-react"
import { FaCcPaypal } from "react-icons/fa"

// data
import { productData } from "@/constants/data"

//format
import { formatToCurrency } from "@/lib/formats"

export default function Page() {
    const dispatch = useAppDispatch()
    const {
        selectedItems,
        items,
        // totalQuantity,
        totalAmount,
        totalAmountDiscount,
        estimatedShipping,
        estimatedTax,
        total
    } = useAppSelector((state) => state.cart.state)
    const router = useRouter()


    const handleRemoveSelectedItems = () => {
        setTimeout(() => {
            dispatch(removeSelectedItems(selectedItems))
        }, 500)
    }

    const handleRemoveAllItems = () => {
        dispatch(removeAllItems())
    }

    return (
        <div className="space-y-10 my-5">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 md:px-6 px-3 ">
                <div className="lg:col-span-2 md:col-span-1 col-span-1">
                    <Card className="w-full border-none h-full">
                        <CardContent className="w-full h-full p-0">
                            <div className="mx-auto w-full  h-full">
                                <CardHeader className="mb-3 p-0">
                                    <div className="flex items-center gap-x-5 w-5/6 ">
                                        <Button className="flex-none" variant="outline" size="icon" onClick={() => router.back()}><ArrowLeft /></Button>
                                        <div className="flex-none relative">
                                            <ShoppingCart size={30} />
                                            <span className="absolute -top-2 -right-2 bg-red-600 rounded-full w-1/2 h-1/2 text-sm  items-center flex justify-center text-white">{items.length}</span>
                                        </div>
                                        <div className="grow flex-1">
                                            <CardTitle className="flex flex-row items-center"> Cart</CardTitle>
                                            <CardDescription className="text-left line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex items-center p-0">
                                    <ScrollArea className="flex-1">
                                        <RowListCounter data={items} />
                                    </ScrollArea>
                                </CardContent>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-1 md:col-span-1 col-span-1 h-full">
                    <Card className="border-none gap-y-10 sticky top-[80px]">
                        <CardHeader className="grid grid-rows-2 grid-flow-col p-0  justify-between items-start">
                            <CardTitle className=" col-span-1 row-span-1">
                                In Your Bag
                            </CardTitle>
                            <CardDescription className="col-span-1 row-span-1">
                                Lorem ipsum dolor sit amet
                            </CardDescription>

                            <Button variant="outline" size="icon" className="row-span-2"><FilePenLine /></Button>
                        </CardHeader>
                        <CardContent className="space-y-5 p-0">
                            <CardDescription className="flex items-center justify-between">
                                <div className="flex space-x-2 items-center">
                                    <strong>Sub Total</strong>
                                    <CircleHelp size={20} />
                                </div>
                                <span>
                                    {formatToCurrency(totalAmount)}
                                </span>
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
                                <strong>
                                    {formatToCurrency(total)}
                                </strong>
                            </CardDescription>
                            <Separator />
                            <div className="space-y-2">
                                <Button className="w-full rounded-full" onClick={() => router.push("/checkout")}>Checkout</Button>
                                <Button className="w-full rounded-full"><span><FaCcPaypal /></span> Pay Pal</Button>
                                {selectedItems.length > 0 ? <Button variant="outline" className="w-full rounded-full" onClick={handleRemoveSelectedItems}>Remove({selectedItems.length})</Button> : <></>}
                                {items.length > 0 && (
                                    <Button variant="outline" className="w-full rounded-full" onClick={handleRemoveAllItems}>
                                        Clear All
                                    </Button>
                                )}
                            </div>
                            <CardDescription>
                                <small>
                                    By selecting one of the above payment options, you confirm that you have read, understand, and agree to Nike’s Terms of Use, Terms of Sale and Return Policy, and acknowledge Nike’s Privacy Policy.
                                </small>
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div >
            <Card className="border-0 md:px-6 px-3">
                <CardHeader className="flex-row items-center px-0 space-x-3 mb-3">
                    <div className="p-0 flex-1">
                        <CardTitle className="mb-3 capitalize">Relate Products</CardTitle>
                        <CardDescription className="md:line-clamp-2 line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet lobortis erat, sed varius arcu iaculis id</CardDescription>
                    </div>
                    <Button variant="outline" size="icon" className="float-end">
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="px-0">
                    <CarouselList data={productData} className="lg:basis-1/6 md:basis-1/3 basis-1/2" />
                </CardContent>
            </Card>
        </div>
    );
}
