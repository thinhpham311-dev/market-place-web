"use client";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import GalleryCarousel from "./GalleryCarousel";
import GalleryNavigation from "./GalleryNavigation";
import LoadingSkeleton from "./LoadingSkeleton";
import { injectReducer } from "@/store";
import reducer from "./store";
import { useSyncCarousels } from "./hooks";
import { images } from "@/constants/data";
import { useSpuContext } from "@/features/spu/hooks";

injectReducer("gallery", reducer);

export default function ProThumbnailGallery() {
  const { spu, loading } = useSpuContext();
  const { current, setApi, navigateTo } = useSyncCarousels();
  const hasNoData = !spu || Object.keys(spu).length === 0;

  if (loading && hasNoData) {
    return <LoadingSkeleton />;
  }

  return (
    <Card className="border-none shadow-none space-y-2">
      <CardContent className="w-full lg:w-auto p-0">
        <GalleryCarousel
          data={images}
          onSetApi={(api) => setApi("main", api)}
          onNavigate={navigateTo}
        />
      </CardContent>

      <CardFooter className="relative p-0">
        <GalleryCarousel
          data={images}
          onSetApi={(api) => setApi("thumbnail", api)}
          current={current}
          className="basis-1/6"
          onNavigate={navigateTo}
        />

        <GalleryNavigation current={current} total={images.length} onNavigate={navigateTo} />
      </CardFooter>
    </Card>
  );
}
