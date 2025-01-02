"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselApi,
    CarouselItem
} from "@/components/ui/molecules";

import { Button } from "@/components/ui/atoms"

import { ArrowRight, ArrowLeft } from "lucide-react"

interface GalleryProps {
    data: string[];
}

interface CarouselItemsProps {
    images: string[];
    current: number;
    isThumbnail?: boolean;
    onImageClick?: (index: number) => void;
}

const ProductImageItem = ({
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
                    className={`relative aspect-square w-full cursor-pointer pl-0 ${isThumbnail ? "basis-1/4" : ""}`}
                    onClick={isThumbnail ? () => onImageClick?.(index) : undefined}
                >

                    <Image
                        src={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"}
                        overrideSrc={image ?? "https://res.cloudinary.com/dgincjt1i/image/upload/v1724934297/samples/man-on-a-street.jpg"}
                        alt={`Carousel ${isThumbnail ? "Thumbnail" : "Main"} Image ${index + 1}`}
                        height={500}
                        width={500}
                        loading="lazy"
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        className={isThumbnail && index === current ? "border-2 border-blue-600" : ""}
                    />

                </CarouselItem>
            ))}
        </>
    );
};


export default function ProductImagesListWithThumbnails({ data }: GalleryProps) {
    const [mainApi, setMainApi] = useState<CarouselApi>();
    const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    const navigateTo = (index: number) => {
        if (mainApi && thumbnailApi) {
            thumbnailApi.scrollTo(index);
            mainApi.scrollTo(index);
            setCurrent(index);
        }
    };

    useEffect(() => {
        if (!mainApi || !thumbnailApi) {
            return;
        }

        const syncMainToThumbnail = () => {
            const selected = mainApi.selectedScrollSnap();
            setCurrent(selected);
            thumbnailApi.scrollTo(selected);
        };

        const syncThumbnailToMain = () => {
            const selected = thumbnailApi.selectedScrollSnap();
            setCurrent(selected);
            mainApi.scrollTo(selected);
        };

        mainApi.on("select", syncMainToThumbnail);
        thumbnailApi.on("select", syncThumbnailToMain);

        return () => {
            mainApi.off("select", syncMainToThumbnail);
            thumbnailApi.off("select", syncThumbnailToMain);
        };
    }, [mainApi, thumbnailApi]);

    return (
        <div className="w-full max-w-xl sm:w-auto">
            <Carousel setApi={setMainApi}>
                <CarouselContent className="mx-1">
                    <ProductImageItem images={data} current={current} />
                </CarouselContent>
            </Carousel>
            <div className="relative">
                <Carousel setApi={setThumbnailApi}>
                    <CarouselContent className="mx-1">
                        <ProductImageItem
                            images={data}
                            current={current}
                            isThumbnail
                            onImageClick={navigateTo}

                        />
                    </CarouselContent>
                </Carousel>
                <Button onClick={() => navigateTo((current - 1 + data.length) % data.length)} className="p-2 absolute top-1/2 -translate-y-1/2 -left-3 z-1 rounded-full  w-7 h-7" size="icon" variant="outline">
                    <ArrowLeft />
                </Button>
                <Button onClick={() => navigateTo((current + 1) % data.length)} className="p-2 absolute top-1/2 -translate-y-1/2 -right-3 z-1 rounded-full w-7 h-7" size="icon" variant="outline">
                    <ArrowRight />
                </Button>
            </div>
        </div>
    );
};
