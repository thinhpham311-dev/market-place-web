import React from "react";
import { AlertTriangle } from "lucide-react";
import { useTranslation } from "@/lib/hooks/use-translation";

interface ErrorMsgProps {
  message?: string;
  className?: string;
}

const ErrorMsg: React.FC<ErrorMsgProps> = ({ message = "", className = "" }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`w-full flex flex-col items-center justify-center  text-center text-muted-foreground aspect-square ${className}`}
    >
      <AlertTriangle className="w-10 h-10 mb-2 text-yellow-500" />
      <p className="text-sm font-medium">{message || t("common_no_data_found")}</p>
    </div>
  );
};

export default ErrorMsg;
