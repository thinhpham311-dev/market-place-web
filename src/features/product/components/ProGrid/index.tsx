import React from "react";
import SpuCard from "../ProCard";
import { ISpuModel } from "@/models/spu";
import LoadingSkeleton from "./LoadingSkeleton";
import NotFound from "./NotFound";
import { cn } from "@/utils/styles";
import { useTranslation } from "@/lib/hooks/use-translation";

interface SpuGridProps {
  data: ISpuModel[];
  className?: string;
  isLoading: boolean;
  error?: Error | string | null;
  countLoadItems?: number;
}

const ProGrid = ({
  data,
  className,
  isLoading,
  error,
  countLoadItems = 12,
}: SpuGridProps) => {
  const { t } = useTranslation();
  const hasNoData = !data || data.length === 0;
  const errorMessage = typeof error === "string" ? error : error?.message;

  if (isLoading && hasNoData) {
    return <LoadingSkeleton className={className} count={countLoadItems} />;
  }

  if (hasNoData && errorMessage) {
    return <NotFound message={errorMessage || t("common_something_went_wrong")} />;
  }

  if (hasNoData) {
    return <NotFound message={t("common_no_data_found")} />;
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
