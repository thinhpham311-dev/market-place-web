import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import NotFound from "./NotFound";
import LoadingSkeleton from "./LoadingSkeleton";
import CategoryCard from "../CategoryCard";
import { cn } from "@/utils/styles";
import { Category } from "@/features/category/types";
import { translateRuntime } from "@/lib/i18n/runtime-translation";

interface ProductRowProps {
  data: Category[];
  itemsPerPage?: number;
  className?: string;
  isLoading: boolean;
  error: Error | string | null;
  countLoadItems: number;
}

const CategoryCarousel = ({
  data,
  itemsPerPage = 12,
  className,
  isLoading,
  error,
  countLoadItems,
}: ProductRowProps) => {
  const hasNoData = !data || data.length === 0;
  const errorMessage = typeof error === "string" ? error : error?.message;

  if (!isLoading && hasNoData && errorMessage) {
    return <NotFound message={errorMessage || translateRuntime("common_something_went_wrong")} />;
  }
  if (isLoading && hasNoData) {
    return <LoadingSkeleton count={countLoadItems} />;
  }

  if (!isLoading && hasNoData) {
    return <NotFound />;
  }
  return (
    <>
      <Carousel>
        <CarouselContent className="-ml-2">
          {data?.slice(0, itemsPerPage).map((item) => (
            <CarouselItem key={item._id} className={cn("pl-2", className)}>
              <CategoryCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className=" top-1/2 -translate-y-1/2 md:-left-5 -left-3 " />
        <CarouselNext className=" top-1/2 -translate-y-1/2 md:-right-5 -right-3" />
      </Carousel>
    </>
  );
};

export default CategoryCarousel;
