"use client";

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
   const hasNoData = !data || data.length === 0;
  const errorMessage = typeof error === "string" ? error : error?.message;

  if (!isLoading && hasNoData && errorMessage) {
    return <NotFound message={errorMessage || t("common_something_went_wrong")} />;
  }
  if (isLoading && hasNoData) {
    return <LoadingSkeleton count={countLoadItems} />;
  }

  if (!isLoading && hasNoData) {
    return <NotFound />;
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
