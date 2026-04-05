"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { UserCheck, UserPlus } from "lucide-react";
import { useTranslation } from "@/lib/hooks/use-translation";

interface ShopFollowButtonProps {
  isFollowing: boolean;
  disabled?: boolean;
  onToggleFollow: () => void;
}

const ShopFollowButton: React.FC<ShopFollowButtonProps> = ({
  isFollowing,
  disabled = false,
  onToggleFollow,
}) => {
  const { t } = useTranslation();

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full"
      onClick={onToggleFollow}
      disabled={disabled}
    >
      {isFollowing ? (
        <>
          <UserCheck className="w-4 h-4 mr-1" />
          <span>{t("shop_following")}</span>
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4 mr-1" />
          <span>{t("shop_follow")}</span>
        </>
      )}
    </Button>
  );
};

export default ShopFollowButton;
