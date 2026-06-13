import React, { useEffect, useState } from "react";
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
  cardOrientation?: "vertical" | "horizontal";
}

const ProGrid = ({
  data,
  className,
  isLoading,
  error,
  countLoadItems = 12,
  cardOrientation = "vertical",
}: SpuGridProps) => {
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
    <div className={cn("grid w-full", className)}>
      {data.map((item) => (
        <SpuCard
          key={item.product_id}
          item={item}
          isLoading={false}
          orientation={cardOrientation}
        />
      ))}
    </div>
  );
};

export default ProGrid;