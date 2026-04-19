import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { NotFound } from "@/components/layout";
import { cn } from "@/utils/styles";

import BrandCard from "@/features/brand/components/BrandCard";
import LoadingSkeleton from "./LoadingSkeleton";
import type { Brand } from "@/features/brand/types";
import { translateRuntime } from "@/lib/i18n/runtime-translation";

interface BrandCarouselProps {
  data: Brand[];
  className?: string;
  isLoading: boolean;
  error?: string | null;
  itemsPerPage?: number;
  logoOnly?: boolean;
}

export default function BrandCarousel({
  data,
  className,
  isLoading,
  error,
  itemsPerPage = 12,
  logoOnly = false,
}: BrandCarouselProps) {
  const hasNoData = !data || data.length === 0;

  if (isLoading && hasNoData) {
    return <LoadingSkeleton count={6} logoOnly={logoOnly} />;
  }

  if (!isLoading && hasNoData && error) {
    return <NotFound message={error} />;
  }

  if (!isLoading && hasNoData) {
    return <NotFound message={translateRuntime("common_no_data_found")} />;
  }

  return (
    <Carousel>
      <CarouselContent className="-ml-2">
        {data.slice(0, itemsPerPage).map((item) => (
          <CarouselItem
            key={item._id}
            className={cn("basis-1/2 pl-2 md:basis-1/4 lg:basis-1/6", className)}
          >
            <BrandCard item={item} logoOnly={logoOnly} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="top-1/2 -left-3 -translate-y-1/2 md:-left-5" />
      <CarouselNext className="top-1/2 -right-3 -translate-y-1/2 md:-right-5" />
    </Carousel>
  );
}
