'use client'
import * as React from "react"
import { memo } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"


//components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Counter from "@/components/ui/counter"

//icons
import { CircleDollarSign } from "lucide-react"

//types
import { IProduct } from "@/types/product"

interface IItemProps {
    item: IProduct
}

const RowListItem = ({ item: { name, image, price, discountPrice } }: IItemProps) => {
    const router = useRouter()

    return (
        <Card className="flex flex-row mb-3 last:mb-0 ">
            <CardHeader className=" lg:w-1/3 md:w-1/2 w-1/3 p-2" onClick={() => router.push("/products/1")}>
                <Image src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt="" width={500} height={500} className="w-full h-full rounded-md" />
            </CardHeader>
            <CardContent className="p-5 flex-1">
                <CardTitle className="mb-3 text-lg capitalize">{name}</CardTitle>
                <CardDescription className="space-x-3 mb-2">
                    <p className="inline-flex items-center gap-x-1 text-xs"><CircleDollarSign size={10} /> <span className="font-bold "> {discountPrice}</span></p>
                    <p className="inline-flex items-center gap-x-1 line-through text-xs"><CircleDollarSign size={10} /><span>{price}</span></p>
                </CardDescription>
                <Counter />
            </CardContent>
        </Card>
    );
}


export default memo(RowListItem)