"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useTranslation } from "@/lib/hooks/use-translation";

interface ShopViewButtonProps {
  slug?: string;
  id?: string | number;
}

const ShopViewButton: React.FC<ShopViewButtonProps> = ({ slug, id }) => {
  const { t } = useTranslation();
  const isDisabled = !id;
  const href = `/shop/${slug || "shop"}-s.${id}`;

  return isDisabled ? (
    <Button variant="outline" size="sm" className="w-full" disabled>
      <Eye className="w-4 h-4 mr-1" />
      <span>{t("shop_view")}</span>
    </Button>
  ) : (
    <Button variant="outline" size="sm" className="w-full" asChild>
      <Link href={href}>
        <Eye className="w-4 h-4 mr-1" />
        <span>{t("shop_view")}</span>
      </Link>
    </Button>
  );
};

export default ShopViewButton;
