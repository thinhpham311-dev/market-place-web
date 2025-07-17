"use client";
import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselApi,
} from "@/components/ui";
import ProImage from "../ProImage";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrent } from "../../store/stateSlice";
import { cn } from "@/lib/utils";

interface ProImagesProps {
    data: string[];
    className?: string;
    onSetThumbnail?: (api: CarouselApi) => void;
    thumbnail?: CarouselApi | null;
    isActive?: boolean
}

const GalleryCarousel = ({
    data,
    className,
    onSetThumbnail,
    thumbnail,
    isActive
}: ProImagesProps) => {
    const dispatch = useAppDispatch();
    const { current } = useAppSelector((state) => state.gallery.state);

    const onImageClick = (index: number) => {
        if (thumbnail) {
            thumbnail.scrollTo(index);
            dispatch(setCurrent(index));
        }
    };

    return (
        <Carousel setApi={onSetThumbnail}>
            <CarouselContent className="-ml-2">
                {data.map((_, i) => (
                    <CarouselItem
                        key={i}
                        className={cn(
                            "relative aspect-square w-full cursor-pointer pl-2",
                            className
                        )}
                        onMouseEnter={() => onImageClick(i)}
                        onClick={() => onImageClick(i)}
                    >
                        <div className={cn("aspect-square", isActive && current === i ? "border-2 border-blue-600" : "")}>
                            <ProImage index={i} image={_} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel >
    );
};

export default React.memo(GalleryCarousel);
