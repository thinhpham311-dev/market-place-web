import {
    Carousel,
    CarouselContent,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/molecules"
import SliderItem from "./item"

interface ISliderWithThumbnailsProps {
    data: Array<string>
}

export const SliderWithThumbnails = ({ data }: ISliderWithThumbnailsProps) => {
    return (
        <Carousel
            className="w-full mx-auto"
            opts={{ loop: true }}
            thumbnails={data}
        >
            <CarouselContent>
                {data.map((item, index) => (
                    <SliderItem key={index} item={item} />
                ))}
            </CarouselContent>
            <CarouselPrevious className=" top-1/2 md:-translate-y-[calc(50%+60px)] -translate-y-[calc(50%+80px)] md:left-5 left-3" />
            <CarouselNext className=" top-1/2 md:-translate-y-[calc(50%+60px)] -translate-y-[calc(50%+60px)] md:right-5 right-3" />
        </Carousel>
    )
}
