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
        <Card onClick={handleRouterLinkToDetail} className="bg-white dark:bg-white rounded-xl aspect-square p-10">
            <CardImage src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt={name} className="w-full h-full  rounded-t-lg cursor-pointer" />
            <CardContent className="p-0">
                <CardTitle className="text-md capitalize cursor-pointer mx-3 text-black dark:text-black text-center">{name}</CardTitle>
            </CardContent>
        </Card>
    );
}


export default memo(CategoryItem)