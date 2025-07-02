"use client"
import * as React from "react"
import { memo } from "react"
import { useRouter } from "next/navigation"

//components
import { Card, CardContent, CardTitle, CardDescription, CardImage } from "@/components/ui/molecules"

//types
import { IProduct } from "@/types/product"

//format
import { formatToCurrency } from "@/lib/formats"

interface IItemProps {
    item: IProduct
}

const ProductItem = ({ item: { name, image, price, discountPrice, _id } }: IItemProps) => {
    const router = useRouter()
    const handleRouterLinkToDetail = () => {
        router.push(`/products/${_id}`)
    }
    return (
        <Card >
            <CardImage onClick={handleRouterLinkToDetail} src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt="" className="w-full h-full rounded-t-lg cursor-pointer" />
            <CardContent className="py-3 px-0 w-full">
                <CardTitle onClick={handleRouterLinkToDetail} className="text-md capitalize cursor-pointer mx-3">
                    {name}
                </CardTitle>
                <CardDescription className="space-x-3 mb-2 inline mx-3">
                    <p className="inline-flex items-center gap-x-1 text-xs"> <span className="font-bold "> {formatToCurrency(discountPrice)}</span></p>
                    <p className="inline-flex items-center gap-x-1 line-through text-xs"><span>{formatToCurrency(price)}</span></p>
                </CardDescription>
            </CardContent>
        </Card>
    );
}


export default memo(ProductItem)