import { AlertTriangle } from "lucide-react";

import { cn } from "@/utils/styles";

type EmptyStateProps = {
  message?: string;
  className?: string;
};

export default function EmptyState({
  message = "No data found.",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center py-10 text-center text-muted-foreground",
        className,
      )}
    >
      <AlertTriangle className="mb-2 h-10 w-10 text-yellow-500" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
