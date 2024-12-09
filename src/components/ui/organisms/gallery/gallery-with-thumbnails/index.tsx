"use client";
import { useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselApi,
} from "@/components/ui/molecules";

import { Button } from "@/components/ui/atoms"
import GalleryItem from "./item"

import { ArrowRight, ArrowLeft } from "lucide-react"

interface GalleryProps {
    data: string[];
}

export const GalleryWithThumbnails = ({ data }: GalleryProps) => {
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
                <CarouselContent className="m-1">
                    <GalleryItem images={data} current={current} />
                </CarouselContent>
            </Carousel>
            <div className="relative">
                <Carousel setApi={setThumbnailApi}>
                    <CarouselContent className="m-1">
                        <GalleryItem
                            images={data}
                            current={current}
                            isThumbnail
                            onImageClick={navigateTo}

                        />
                    </CarouselContent>
                </Carousel>
                <Button onClick={() => navigateTo((current - 1 + data.length) % data.length)} className="p-2 absolute top-1/2 -translate-y-1/2 -left-3 z-10 rounded-full  w-7 h-7" size="icon" variant="outline">
                    <ArrowLeft />
                </Button>
                <Button onClick={() => navigateTo((current + 1) % data.length)} className="p-2 absolute top-1/2 -translate-y-1/2 -right-3 z-10 rounded-full w-7 h-7" size="icon" variant="outline">
                    <ArrowRight />
                </Button>
            </div>
        </div>
    );
};
