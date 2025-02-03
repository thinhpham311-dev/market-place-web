'use client'
import { memo } from "react"
import { useRouter } from "next/navigation"

//components
import { Badge, Separator } from "@/components/ui/atoms"
import { Card, CardContent, CardDescription, CardImage, CardTitle } from "@/components/ui/molecules"

//types
import { IcartItem } from "@/types/cart"

//format
import { formatToCurrency } from "@/lib/formats"

interface IProductItemInCartProps {
    item: IcartItem
    totalItems?: number,
};


function ProductItemInCart({ item: { name, image, price, options, discountPrice, _id, quantity, totalPrice = 0, discountedTotalPrice = 0 } }: IProductItemInCartProps) {
    const router = useRouter()

    const handleRouterLinkToDetail = () => {
        router.push(`/products/${_id}`)
    }

    return (
        <Card layout="horizontal" className="relative mb-3  last:mb-0 items-start grid lg:grid-cols-2 md:grid-cols-1 grid-cols-2 gap-3 p-3">
            <CardImage
                onClick={handleRouterLinkToDetail}
                src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"}
                alt=""
                className=" rounded-lg  bg-slate-600 cursor-pointer p-0 lg:col-span-1 md:col-span-1 col-span-1"
            />
            <CardContent className=" p-0  h-full lg:col-span-1 md:col-span-1 col-span-1 content-center space-y-2">
                <CardTitle
                    onClick={handleRouterLinkToDetail}
                    className=" text-lg capitalize cursor-pointer">
                    {name}
                </CardTitle>
                <CardDescription className="gap-1 flex flex-row">
                    {options?.map((option) =>
                        <Badge variant="outline" key={option?.label.split("").join("-")}>{option?.label}</Badge>
                    )}
                </CardDescription>
                <CardDescription className="space-x-2 inline ">
                    <p className="inline-flex items-center gap-x-1 text-xs"> <span className="font-bold "> {formatToCurrency(discountPrice)}</span></p>
                    <p className="inline-flex items-center gap-x-1 line-through text-xs"><span>{formatToCurrency(price)}</span></p>
                    <span>x</span>
                    <strong className="inline-flex items-center gap-x-1 text-xs ">
                        {quantity}
                    </strong>
                </CardDescription>
                <Separator />
                <CardDescription>
                    <p className=" items-center gap-x-1 text-xs">
                        <strong> Total: </strong>{formatToCurrency(totalPrice)}
                    </p>
                    <p className=" items-center gap-x-1 text-xs">
                        <strong> Discounted Total:</strong> {formatToCurrency(discountedTotalPrice)}
                    </p>
                </CardDescription>
            </CardContent>
        </Card>
    );
}

export default memo(ProductItemInCart)