"use client"

import * as React from "react"
import { memo } from "react"
import { useRouter } from "next/navigation"
import Loading from "./Loading"
import { Card, CardContent, CardTitle, CardDescription, CardImage } from "@/components/ui"
import { ISpuPro } from "@/interfaces/spu"
import NotFound from "./NotFound"

interface ISpuCardProps {
    item: ISpuPro
    isLoading?: boolean
}

const ProCard = ({
    item,
    isLoading
}: ISpuCardProps) => {
    const router = useRouter()

    if (isLoading) {
        <Loading />
    }

    if (!item) {
        <NotFound message="Product not found." />
    }

    const { product_name, product_image, product_price, product_id, product_shop, product_slug } = item

    const handleRouterLinkToDetail = () => {
        router.push(`/products/${product_slug}-i.${product_shop}.${product_id}`)
    }

    return (
        <Card className="flex flex-col justify-start h-full w-full col-span-1">
            <CardImage
                onClick={handleRouterLinkToDetail}
                src={product_image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png"}
                alt=""
                className="aspect-square rounded-t-lg cursor-pointer"
            />
            <CardContent className="p-3 w-full">
                <CardTitle
                    onClick={handleRouterLinkToDetail}
                    className="text-md capitalize line-clamp-2 cursor-pointer"
                >
                    <p>{product_name}</p>
                </CardTitle>
                <CardDescription className="space-x-3 mb-2 inline">
                    {product_price && <p>{product_price}</p>}
                </CardDescription>
            </CardContent>
        </Card>
    )
}

export default memo(ProCard)
