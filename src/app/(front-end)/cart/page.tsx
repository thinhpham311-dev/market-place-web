'use client'
import * as React from "react"
import { useRouter } from "next/navigation"
//components
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    ScrollArea,
} from "@/components/ui/molecules"
import { Separator, Button } from "@/components/ui/atoms"

//icons
import { CircleHelp, FilePenLine } from "lucide-react"
import { FaCcPaypal } from "react-icons/fa";


//datas
import { productData } from "@/constants/data"
import { RowList } from "@/components/ui/organisms"



export default function Page() {

    const router = useRouter()

    return (
        <div className="space-y-10 md:my-5">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 md:px-6 px-3 ">
                <div className="lg:col-span-2 md:col-span-1 col-span-1">
                    <Card className="w-full border-none h-full">
                        <CardContent className="w-full h-full p-0">
                            <div className="mx-auto w-full flex flex-col justify-between h-full">
                                <CardHeader className="mb-3 p-0">
                                    <CardTitle className="flex flex-row items-center"> Cart</CardTitle>
                                    <CardDescription className="text-left line-clamp-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula</CardDescription>
                                </CardHeader>
                                <CardContent className="flex items-center p-0">
                                    <ScrollArea className="flex-1">
                                        <RowList data={productData} />
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
                                    <strong>Subtotal</strong>
                                    <CircleHelp size={20} />
                                </div>
                                <span>
                                    $170.00
                                </span>
                            </CardDescription>
                            <CardDescription className="flex items-center justify-between">
                                <div className="flex space-x-2 items-center">
                                    <strong>Estimated Shipping</strong>
                                </div>
                                <span>
                                    $0.00
                                </span>
                            </CardDescription>
                            <CardDescription className="flex items-center justify-between">
                                <div className="flex space-x-2 items-center">
                                    <strong>Estimated Tax</strong>
                                    <CircleHelp size={20} />
                                </div>
                                <span>
                                    $170.00
                                </span>
                            </CardDescription>
                            <Separator />
                            <CardDescription className="flex items-center justify-between">
                                <div className="flex space-x-2 items-center">
                                    <strong>Total</strong>
                                </div>
                                <strong>
                                    $170.00
                                </strong>
                            </CardDescription>
                            <Separator />
                            <div className="space-y-2">
                                <Button className="w-full rounded-full" onClick={() => router.push("/cart")}>Checkout</Button>
                                <Button className="w-full rounded-full"><span><FaCcPaypal /></span> Pay Pal</Button>
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
        </div>
    );
}

