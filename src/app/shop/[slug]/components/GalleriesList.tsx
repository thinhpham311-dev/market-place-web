'use client'
//components
import * as React from "react"
import Image from "next/image"

//ui
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
    CarouselItem,
    Card
} from "@/components/ui"
import { NotFound } from "@/components/layout"

//types
import { IAds } from "@/features/ads/types"

//datas
import { bannerData } from "@/constants/data"

interface IItemProps {
    item: IAds
}

const GalleryItem = ({ item: {
    image
} }: IItemProps) => {
    return (
        <CarouselItem className="md:h-[400px] h-[270px] bg-slate-600 ">
            <Image src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png"} overrideSrc={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1751873400/Image-not-found_qxnjwm.png"} alt="" width={200} height={200} className="w-full h-full object-contain rounded-t-sm" />
        </CarouselItem>
    );
}

export default function GalleriesList() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    return (
        <>
            {bannerData && bannerData.length > 0 ?
                <Card className="border-0 shadow-none">
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
                : <NotFound />}
        </>
    );
}

