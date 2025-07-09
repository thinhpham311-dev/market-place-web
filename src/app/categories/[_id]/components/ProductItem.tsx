"use client"
import * as React from "react"
import { memo } from "react"
import { useRouter } from "next/navigation"

//components
import { Card, CardContent, CardTitle, CardDescription, CardImage } from "@/components/ui/molecules"

//types
import { IProduct } from "@/interfaces/product"

//format
import { formatToCurrency } from "@/lib/formats"

interface IItemProps {
    item: IProduct
}

const ProductItem = ({ item: { product_name, image, product_price,
    //  discountPrice, 
    product_id } }: IItemProps) => {
    const router = useRouter()
    const handleRouterLinkToDetail = () => {
        router.push(`/products/${product_id}`)
    }
    return (
        <Card >
            <CardImage onClick={handleRouterLinkToDetail} src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png"} alt="" className="w-full h-full rounded-t-lg cursor-pointer" />
            <CardContent className="p-0">
                <CardTitle onClick={handleRouterLinkToDetail} className="text-md capitalize cursor-pointer mx-3">{product_name}</CardTitle>
                <CardDescription className="space-x-3 mb-2 inline">
                    {/* <p className="inline-flex items-center gap-x-1 text-xs"> <span className="font-bold "> {formatToCurrency(discountPrice)}</span></p> */}
                    <p className="inline-flex items-center gap-x-1 line-through text-xs"><span>{formatToCurrency(product_price)}</span></p>
                </CardDescription>
            </CardContent>
        </Card>
    );
}


export default memo(ProductItem)