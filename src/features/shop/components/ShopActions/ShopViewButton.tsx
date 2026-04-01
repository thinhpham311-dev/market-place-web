"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useTranslation } from "@/lib/hooks/use-translation";

interface ShopViewButtonProps {
  slug?: string;
  id?: string | number;
}

const ShopViewButton: React.FC<ShopViewButtonProps> = ({ slug, id }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const isDisabled = !id;

  const handleView = () => {
    if (!id) return;
    router.push(`/shop/${slug || "shop"}-s.${id}`);
  };

  return (
    <Button variant="outline" size="sm" className="w-full" onClick={handleView} disabled={isDisabled}>
      <Eye className="w-4 h-4 mr-1" />
      <span>{t("shop_view")}</span>
    </Button>
  );
};

export default ShopViewButton;
