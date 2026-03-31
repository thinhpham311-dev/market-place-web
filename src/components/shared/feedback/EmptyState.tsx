"use client";

import { AlertTriangle } from "lucide-react";

import { cn } from "@/utils/styles";
import { useTranslation } from "@/lib/hooks/use-translation";

type EmptyStateProps = {
  message?: string;
  className?: string;
};

export default function EmptyState({
  message,
  className,
}: EmptyStateProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center py-10 text-center text-muted-foreground",
        className,
      )}
    >
      <AlertTriangle className="mb-2 h-10 w-10 text-yellow-500" />
      <p className="text-sm font-medium">{message || t("common_no_data_found")}</p>
    </div>
  );
}
