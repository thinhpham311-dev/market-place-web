"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";
import { useTranslation } from "@/lib/hooks";

const MiniCartCheckoutButton = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Button
      className="flex items-center gap-1"
      variant="default"
      size="sm"
      onClick={() => router.push("/checkout")}
    >
      <CreditCard className="w-4 h-4" />
      <span>{t("cart_checkout")}</span>
    </Button>
  );
};

export default MiniCartCheckoutButton;
