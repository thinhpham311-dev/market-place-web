"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui";
import GalleryCarousel from "./GalleryCarousel";
import GalleryNavigation from "./GalleryNavigation";
import { injectReducer } from "@/store";
import reducer from "./store";
import { useSyncCarousels } from "./hooks";

interface ThumbnailGalleryProps {
    data: string[];
}

injectReducer("gallery", reducer);

export default function ThumbnailGallery({ data }: ThumbnailGalleryProps) {
    const { current, setApi, navigateTo } = useSyncCarousels();

    return (
        <Card className="border-none shadow-none space-y-2">
            <CardContent className="w-full max-w-xl sm:w-auto p-0">
                <GalleryCarousel
                    data={data}
                    onSetApi={(api) => setApi("main", api)}
                    onNavigate={navigateTo}
                />
            </CardContent>

            <CardFooter className="relative p-0">
                <GalleryCarousel
                    data={data}
                    onSetApi={(api) => setApi("thumbnail", api)}
                    current={current}
                    className="basis-1/6"
                    onNavigate={navigateTo}
                />

                <GalleryNavigation
                    current={current}
                    total={data.length}
                    onNavigate={navigateTo}
                />
            </CardFooter>
        </Card>
    );
}
