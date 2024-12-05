
import * as React from "react"
import { memo } from "react"
import Image from 'next/image'
import { CarouselItem } from "@/components/ui/molecules/carousel"
import { IImage } from "@/types/banner"

interface IItemProps {
    item: IImage
}

const SliderItem = ({ item: {
    image
} }: IItemProps) => {
    return (
        <CarouselItem className="md:h-[400px] h-[270px] bg-slate-600 ">
            <Image src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt="" width={200} height={200} className="w-full h-full object-contain rounded-t-sm" />
        </CarouselItem>
    );
}

export default memo(SliderItem)