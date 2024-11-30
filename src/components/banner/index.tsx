
import * as React from "react"
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { bannerSliderData } from '@/constants/data'

export default function Banner() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    return (
        <div className=" w-full">
            <Carousel
                plugins={[plugin.current]}
                className="w-full mx-auto "
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {bannerSliderData.map((item, index) => (
                        <CarouselItem key={index} className="md:h-[400px] h-[200px] bg-slate-600 ">
                            <Image src={item.source} alt={item.title} width={1100} height={300} className="h-full w-full  overflow-hidden object-contain rounded-md object-center" />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className=" top-1/2 -translate-y-1/2 left-7" />
                <CarouselNext className=" top-1/2 -translate-y-1/2 right-7" />
            </Carousel>
        </div>
    );
}