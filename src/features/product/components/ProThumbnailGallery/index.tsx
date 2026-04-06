"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import GalleryCarousel from "./GalleryCarousel";
import GalleryNavigation from "./GalleryNavigation";
import LoadingSkeleton from "./LoadingSkeleton";
import { injectReducer } from "@/store";
import reducer from "./store";
import { useSyncCarousels } from "./hooks";
import { images } from "@/constants/data";
import { useSpuContext } from "@/features/spu/hooks";
import ImageGallery from "react-image-gallery";

injectReducer("gallery", reducer);

export default function ProThumbnailGallery() {
  const { spu, loading } = useSpuContext();
  const { current, setApi, navigateTo } = useSyncCarousels();
  const [open, setOpen] = useState(false);
  const galleryRef = useRef<ImageGallery | null>(null);
  const hasNoData = !spu || Object.keys(spu).length === 0;
  const galleryItems = images.map((image, index) => ({
    original: image,
    thumbnail: image,
    originalAlt: `Product image ${index + 1}`,
    thumbnailAlt: `Product thumbnail ${index + 1}`,
  }));

  useEffect(() => {
    if (!open) return;
    galleryRef.current?.slideToIndex(current);
  }, [current, open]);

  if (loading && hasNoData) {
    return <LoadingSkeleton />;
  }

  const handleOpenGallery = (index: number) => {
    navigateTo(index);
    setOpen(true);
  };

  return (
    <>
      <Card className="border-none shadow-none space-y-2">
        <CardContent className="relative w-full lg:w-auto p-0">
          <div className="absolute left-2 top-2 z-10 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
            {current + 1} / {images.length}
          </div>
          <GalleryCarousel data={images}          
             onImageClick={handleOpenGallery}
 onSetApi={(api) => setApi("main", api)} onNavigate={navigateTo} />
        </CardContent>

        <CardFooter className="relative p-0">
          <GalleryCarousel
            data={images}
            onSetApi={(api) => setApi("thumbnail", api)}
            current={current}
            className="basis-1/6"
            onNavigate={navigateTo}
            onImageClick={handleOpenGallery}
          />

          <GalleryNavigation current={current} total={images.length} onNavigate={navigateTo} />
        </CardFooter>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl border-none p-4">
          <DialogTitle className="sr-only">Product gallery</DialogTitle>
          <DialogDescription className="sr-only">
            Gallery popup for product thumbnails.
          </DialogDescription>
          <div className="relative">
            <div className="absolute left-4 top-4 z-10 rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white">
              {current + 1} / {galleryItems.length}
            </div>
            <ImageGallery
              ref={galleryRef}
              items={galleryItems}
              startIndex={current}
              showPlayButton={false}
              showFullscreenButton={false}
              onSlide={navigateTo}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
