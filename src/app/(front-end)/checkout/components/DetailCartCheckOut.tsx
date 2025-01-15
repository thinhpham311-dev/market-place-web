'use client'

//components
import { Button, Separator } from "@/components/ui/atoms"
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/molecules';
import OrderSummary from "./OrderSummary";
import ProductItemsListInCart from "./ProductItemsListInCart"

//store
import { useAppSelector } from "@/lib/hooks";

//icons
import { FilePenLine, ArrowLeft } from "lucide-react"

//format
import { useRouter } from "next/navigation";
import DeliveryInfoForm from "./DeliveryInfoForm";
import { NotFound } from "@/components/ui/organisms";

export default function DetailCartCheckOut() {
    const router = useRouter()
    const {
        items,
        totalAmount,
        totalAmountDiscount,
        estimatedShipping,
        estimatedTax,
        total
    } = useAppSelector((state) => state.cart.state)

    return (
        <Card>
            <CardHeader className="grid grid-rows-2 grid-flow-col auto-cols-max gap-x-4 items-center md:px-6 px-3">
                <Button className="row-span-2" variant="outline" size="icon" onClick={() => router.back()}><ArrowLeft /></Button>
                <CardTitle className="col-span-2">
                    Check Out
                </CardTitle>
                <CardDescription className="col-span-2 flex-wrap">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in purus fringilla,
                </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="px-0">
                <div className="md:px-6 px-3 w-full grid md:grid-cols-10 grid-cols-1 gap-8">
                    <div className="md:col-span-6 col-span-1 ">
                        <Card className=" border-none">
                            <CardHeader className="px-0">
                                <CardTitle>
                                    Delivery Options
                                </CardTitle>
                                <CardDescription>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in purus fringilla,
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <DeliveryInfoForm />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="md:col-span-4 col-span-1 ">
                        <Card className=" border-none">
                            <CardHeader className="grid grid-rows-2 grid-flow-col px-0 justify-between items-start">
                                <CardTitle className=" col-span-1 row-span-1">
                                    In Your Cart
                                </CardTitle>
                                <CardDescription className="col-span-1 row-span-1">
                                    Lorem ipsum dolor sit amet
                                </CardDescription>
                                <Button onClick={() => router.push("/cart")} variant="outline" size="icon" className="row-span-2"><FilePenLine /></Button>
                            </CardHeader>
                            <CardContent className="px-0">
                                <OrderSummary
                                    totalAmount={totalAmount}
                                    totalAmountDiscount={totalAmountDiscount}
                                    estimatedShipping={estimatedShipping}
                                    estimatedTax={estimatedTax}
                                    total={total} />
                            </CardContent>
                            <CardContent className="px-0">
                                {items && items.length > 0 ? <ProductItemsListInCart data={items} /> : <NotFound />}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>

    );
}


