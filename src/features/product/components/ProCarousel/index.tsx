"use client";

import {useEffect, useState} from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import SpuCard from "../ProCard";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { cn } from "@/utils/styles";
import { ISpuModel } from "@/models/spu";
import { useTranslation } from "@/lib/hooks/use-translation";

interface ISpuCarouselProps {
  data: ISpuModel[];
  itemsPerPage?: number;
  className?: string;
  isLoading: boolean;
  error?: Error | string | null;
  countLoadItems: number;
}

const SpuCarousel = ({
  data,
  itemsPerPage = 12,
  className,
  isLoading,
  error,
  countLoadItems,
}: ISpuCarouselProps) => {
  const { t } = useTranslation();
  const [showError, setShowError] = useState(false);

  const hasNoData = !data || data.length === 0;
  const errorMessage =
    typeof error === "string" ? error : error?.message;

  useEffect(() => {
    if (!errorMessage) {
      setShowError(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowError(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  // Loading thật
  if (isLoading) {
    return (
      <LoadingSkeleton
        className={className}
        count={countLoadItems}
      />
    );
  }

  // Delay error 3s
  if (errorMessage && !showError) {
    return (
      <LoadingSkeleton
        className={className}
        count={countLoadItems}
      />
    );
  }

  // Error
  if (errorMessage && showError) {
    return (
      <NotFound
        message={errorMessage}
      />
    );
  }

  // No data
  if (hasNoData) {
    return (
      <NotFound
        message={t("common_no_data_found")}
      />
    );
  }
  return (
    <Carousel>
      <CarouselContent className="-ml-2">
        {data.slice(0, itemsPerPage).map((product) => (
          <CarouselItem key={product.product_id} className={cn("pl-2", className)}>
            <SpuCard item={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="top-1/2 -translate-y-1/2 md:-left-5 -left-3" />
      <CarouselNext className="top-1/2 -translate-y-1/2 md:-right-5 -right-3" />
    </Carousel>
  );
};

export default SpuCarousel;
