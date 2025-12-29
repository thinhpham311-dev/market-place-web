import React from "react";
import SpuCard from "../ProCard";
import { ISpuModel } from "@/models/spu";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { cn } from "@/utils/styles";

interface SpuGridProps {
  data: ISpuModel[];
  className?: string;
  isLoading: boolean;
  error?: Error | null;
  countLoadItems?: number;
}

const ProGrid = ({ data, className, isLoading, error, countLoadItems = 12 }: SpuGridProps) => {
  const hasNoData = !data || data.length === 0;

  if (isLoading && hasNoData) {
    return <LoadingSkeleton className={className} count={countLoadItems} />;
  }

  if (!isLoading && hasNoData && error) {
    return <NotFound message={error.message || "Something went wrong."} />;
  }

  if (hasNoData) {
    return <NotFound />;
  }
  return (
    <div className={cn("grid w-full", className)}>
      {data.map((item) => (
        <SpuCard key={item.product_id} item={item} isLoading={false} />
      ))}
    </div>
  );
};

export default ProGrid;
