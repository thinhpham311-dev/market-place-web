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
        <Card className="lg:mx-20 md:mx-0 mx-0 border-none shadow-none">
            <CardHeader className="flex flex-row gap-x-4 items-center px-0">
                <Button variant="outline" size="icon" onClick={() => router.back()}><ArrowLeft /></Button>
                <div className="flex-1 space-y-1">
                    <CardTitle className="col-span-2">
                        Check Out
                    </CardTitle>
                    <CardDescription className="col-span-2  line-clamp-2 ">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in purus fringilla,
                    </CardDescription>
                </div>
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
                <div className="p-0 w-full grid md:grid-cols-10 grid-cols-1 gap-x-8">
                    <div className="md:col-span-6 col-span-1 ">
                        <DeliveryInfoForm />
                    </div>
                    <div className="md:col-span-4 col-span-1 relative">
                        <Card className=" border-none sticky top-[50px] left-0">
                            <CardHeader className="grid grid-rows-2 grid-flow-col  justify-between items-start px-0">
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


