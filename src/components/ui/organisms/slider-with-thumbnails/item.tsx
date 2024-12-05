
import * as React from "react"
import { memo } from "react"
import Image from 'next/image'
import { CarouselItem } from "@/components/ui/molecules/carousel"

interface IItemProps {
    item: string
}

const SliderItem = ({ item }: IItemProps) => {
    return (
        <CarouselItem className=" bg-slate-600 ">
            <Image src={item ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt="" width={200} height={200} className="w-full h-full object-contain rounded-t-sm" />
        </CarouselItem>
    );
}

export default memo(SliderItem)