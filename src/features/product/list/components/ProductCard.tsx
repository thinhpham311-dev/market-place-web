"use client"
import * as React from "react"
import { memo } from "react"
import { useRouter } from "next/navigation"

//components
import { Card, CardContent, CardTitle, CardDescription, CardImage } from "@/components/ui"
import ProductPrice from "@/features/product/detail/components/ProInfo/ProductPrice"

//types
import { IProduct } from "@/features/product/types"

//format

interface IItemProps {
    item: IProduct
}

const ProductCard = ({ item: { product_name, image, product_price, product_id, product_shop, product_slug } }: IItemProps) => {
    const router = useRouter()
    const handleRouterLinkToDetail = () => {
        router.push(`/products/${product_slug}-i.${product_shop}.${product_id}`)
    }

    return (
        <Card className="flex flex-col justify-start h-full w-full col-span-1">
            <CardImage onClick={handleRouterLinkToDetail} src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png"} alt="" className=" aspect-square  rounded-t-lg cursor-pointer" />
            <CardContent className="p-3 w-full">
                <CardTitle onClick={handleRouterLinkToDetail} className="text-md capitalize  line-clamp-2 cursor-pointer ">
                    <p>{product_name}</p>
                </CardTitle>
                <CardDescription className="space-x-3 mb-2 inline ">
                    {/* <p className="inline-flex items-center gap-x-1 text-xs"> <span className="font-bold "> {formatToCurrency(discountPrice)}</span></p> */}
                    <ProductPrice price={product_price} flashSalePrice={product_price - 1} />
                </CardDescription>
            </CardContent>
        </Card >
    );
}


export default memo(ProductCard)