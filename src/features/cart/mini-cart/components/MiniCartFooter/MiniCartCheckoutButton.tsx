"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useTranslation } from "@/lib/hooks";

const MiniCartCheckoutButton = () => {
  const { t } = useTranslation();

  return (
    <Button className="flex items-center gap-1" variant="default" size="sm" asChild>
      <Link href="/checkout">
        <CreditCard className="w-4 h-4" />
        <span>{t("cart_checkout")}</span>
      </Link>
    </Button>
  );
};

export default MiniCartCheckoutButton;
