import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useTranslation } from "@/lib/hooks/use-translation";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Button
      variant="outline"
      size="icon"
      className="relative text-red-600"
      disabled
      title={t("cart_load_failed")}
    >
      <AlertCircle />
    </Button>
  );
};

export default NotFound;
