
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/molecules/carousel"
import SliderItem from "./Item"
import { IBanner } from "@/types/banner"

interface ISliderProps {
    data: Array<IBanner>
}

export const Slider = ({ data }: ISliderProps) => {

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full mx-auto "
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
                {data.map((item) => (
                    <SliderItem key={item.title} item={item} />
                ))}
            </CarouselContent>
            <CarouselPrevious className=" top-1/2 -translate-y-1/2 md:left-5 left-3" />
            <CarouselNext className=" top-1/2 -translate-y-1/2 md:right-5 right-3" />
        </Carousel>

    );
}
