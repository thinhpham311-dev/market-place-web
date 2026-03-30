"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

const MiniCartCheckoutButton = () => {
  const router = useRouter();

  return (
    <Button
      className="flex items-center gap-1"
      variant="default"
      size="sm"
      onClick={() => router.push("/checkout")}
    >
      <CreditCard className="w-4 h-4" />
      <span>Check Out</span>
    </Button>
  );
};

export default MiniCartCheckoutButton;
