"use client"
import * as React from "react"
import { memo } from "react"
import { useRouter } from "next/navigation"

//components
import { Card, CardContent, CardTitle, CardDescription, CardImage } from "@/components/ui/molecules"
import { CarouselItem } from "@/components/ui/molecules/carousel"

//icons
import { CircleDollarSign } from "lucide-react"

//types
import { IProduct } from "@/types/product"


interface IItemProps {
    item: IProduct
}

const CarouselListItem = ({ item: { name, image, price, discountPrice } }: IItemProps) => {
    const router = useRouter()
    return (
        <CarouselItem className="pl-2  lg:basis-1/6  md:basis-1/3 basis-1/2">
            <Card >
                <CardImage onClick={() => router.push("/products/1")} src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt="" className="w-full h-full rounded-t-lg" />
                <CardContent className="p-3">
                    <CardTitle onClick={() => router.push("/products/1")} className="mb-2 text-md capitalize cursor-pointer">{name}</CardTitle>
                    <CardDescription className="space-x-3 mb-2">
                        <p className="inline-flex items-center gap-x-1 text-xs"><CircleDollarSign size={10} /> <span className="font-bold "> {discountPrice}</span></p>
                        <p className="inline-flex items-center gap-x-1 line-through text-xs"><CircleDollarSign size={10} /><span>{price}</span></p>
                    </CardDescription>
                </CardContent>

            </Card>
        </CarouselItem>
    );
}


export default memo(CarouselListItem)