'use client'
import * as React from "react"
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

export const GridListItem = ({ item: { name, image, price, discountPrice, id } }: IItemProps) => {
    const router = useRouter()
    const handleRouterLinkToDetail = () => {
        router.push(`/products/${id}`)
    }
    return (
        <Card >
            <CardImage
                onClick={handleRouterLinkToDetail}
                src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"}
                alt=""
                className="w-full h-full rounded-t-lg aspect-square cursor-pointer"
            />
            <CardContent className="p-3">
                <CardTitle onClick={handleRouterLinkToDetail} className="mb-2 text-md capitalize cursor-pointer">{name}</CardTitle>
                <CardDescription className="space-x-3 mb-2">
                    <p className="inline-flex items-center gap-x-1 text-xs"> <span className="font-bold "> {formatToCurrency(discountPrice)}</span></p>
                    <p className="inline-flex items-center gap-x-1 line-through text-xs"><span>{formatToCurrency(price)}</span></p>
                </CardDescription>
            </CardContent>
        </Card>
    );
}

