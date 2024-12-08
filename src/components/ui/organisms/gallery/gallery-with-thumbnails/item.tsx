
import * as React from "react"
import { memo } from "react"
import Image from 'next/image'
import { CarouselItem } from "@/components/ui/molecules/carousel"

interface CarouselItemsProps {
    images: string[];
    current: number;
    isThumbnail?: boolean;
    onImageClick?: (index: number) => void;
}

const GalleryItem = ({
    images,
    current,
    isThumbnail = false,
    onImageClick,
}: CarouselItemsProps) => {
    return (
        <>
            {images.map((image, index) => (
                <CarouselItem
                    key={index}
                    className={`relative aspect-square w-full ${isThumbnail ? "basis-1/4" : ""}`}
                    onClick={isThumbnail ? () => onImageClick?.(index) : undefined}
                >
                    <Image
                        src={image}
                        alt={`Carousel ${isThumbnail ? "Thumbnail" : "Main"} Image ${index + 1}`}
                        fill
                        style={{ objectFit: "cover" }}
                        className={isThumbnail && index === current ? "border-2" : ""}
                    />
                </CarouselItem>
            ))}
        </>
    );
};

export default memo(GalleryItem)