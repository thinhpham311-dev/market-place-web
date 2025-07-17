"use client";
import React from "react";
import { CarouselApi, Card, CardContent, CardFooter } from "@/components/ui"
import GalleryCarousel from "./GalleryCarousel"
import GalleryNavigation from "./GalleryNavigation"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrent } from "@/features/product/detail/store/stateSlice"

interface ThumbnailGalleryProps {
    data: string[];
}

export default function ThumbnailGallery({ data }: ThumbnailGalleryProps) {
    const dispatch = useAppDispatch()
    const [mainApi, setMainApi] = React.useState<CarouselApi>();
    const [thumbnailApi, setThumbnailApi] = React.useState<CarouselApi>();
    const { current } = useAppSelector((state) => state.gallery.state);

    const navigateTo = (index: number) => {
        console.log()
        if (mainApi && thumbnailApi) {
            thumbnailApi.scrollTo(index);
            mainApi.scrollTo(index);
            dispatch(setCurrent(index));
        }
    };

    React.useEffect(() => {
        if (!mainApi || !thumbnailApi) {
            return;
        }

        const syncMainToThumbnail = () => {
            const selected = mainApi.selectedScrollSnap();
            dispatch(setCurrent(selected));
            thumbnailApi.scrollTo(selected);
        };

        const syncThumbnailToMain = () => {
            const selected = thumbnailApi.selectedScrollSnap();
            dispatch(setCurrent(selected));
            mainApi.scrollTo(selected);
        };

        mainApi.on("select", syncMainToThumbnail);
        thumbnailApi.on("select", syncThumbnailToMain);

        return () => {
            mainApi.off("select", syncMainToThumbnail);
            thumbnailApi.off("select", syncThumbnailToMain);
        };
    }, [dispatch, mainApi, thumbnailApi]);

    return (
        <Card className="border-none">
            <CardContent className="w-full max-w-xl sm:w-auto p-0">
                <GalleryCarousel
                    data={data}
                    onSetThumbnail={setMainApi}
                    thumbnail={mainApi} />
            </CardContent>
            <CardFooter className="relative p-0">
                <GalleryCarousel data={data}
                    onSetThumbnail={setThumbnailApi}
                    thumbnail={thumbnailApi}
                    isActive={true}
                    className="basis-1/4" />

                <GalleryNavigation
                    current={current}
                    total={data.length}
                    onNavigate={navigateTo}
                />
            </CardFooter>
        </Card>
    );
}
