"use client"
import * as React from "react"
import { memo } from "react"
import { useRouter } from "next/navigation"

//components
import { Card, CardContent, CardTitle, CardImage } from "@/components/ui/molecules"

//types
import { ICategory } from "@/types/category"

//format

interface IItemProps {
    item: ICategory
}

const CategoryItem = ({ item: { _id, name, image } }: IItemProps) => {
    const router = useRouter()
    const handleRouterLinkToDetail = () => {
        router.push(`/categories/${_id}`)
    }
    return (
        <Card onClick={handleRouterLinkToDetail} className=" rounded-full aspect-square p-5 flex flex-col justify-start items-center gap-3">
            <CardContent className="p-0 rounded-full bg-white dark:bg-white  p-3 xl:mx-10 mx-5 xl:mt-5">
                <CardImage src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt={name} className="w-full h-full aspect-square rounded-t-lg cursor-pointer" />
            </CardContent>
            <CardContent className="p-0">
                <CardTitle className="text-md capitalize cursor-pointer text-black dark:text-white text-center xl:line-clamp-2 line-clamp-1">{name}</CardTitle>
            </CardContent>
        </Card>
    );
}


export default memo(CategoryItem)