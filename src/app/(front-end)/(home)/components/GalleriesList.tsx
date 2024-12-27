'use client'
//components
import * as React from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
    CarouselItem,
    Card
} from "@/components/ui/molecules"
import { IImage } from "@/types/banner"
import { bannerData } from "@/constants/data"

interface IItemProps {
    item: IImage
}

const GalleryItem = ({ item: {
    image
} }: IItemProps) => {
    return (
        <CarouselItem className="md:h-[400px] h-[270px] bg-slate-600 ">
            <Image src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"} alt="" width={200} height={200} className="w-full h-full object-contain rounded-t-sm" />
        </CarouselItem>
    );
}

export default function GalleriesList() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    return (
        <Card className="border-0 shadow-none md:px-6 px-3">
            <Carousel
                plugins={[plugin.current]}
                className="w-full mx-auto "
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {bannerData.map((item) => (
                        <GalleryItem key={item.title?.split("").join("-")} item={item} />
                    ))}
                </CarouselContent>
                <CarouselPrevious className=" top-1/2 -translate-y-1/2 md:-left-5 -left-3 " />
                <CarouselNext className=" top-1/2 -translate-y-1/2 md:-right-5 -right-3" />
            </Carousel>
        </Card>
    );
}

