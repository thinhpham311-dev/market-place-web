"use client";

import React from "react";
import { toast } from "sonner";
import { ItemActions } from "@/components/ui/item";
import { useAppSelector } from "@/lib/hooks";
import { useTranslation } from "@/lib/hooks/use-translation";
import { useShopInfoContext } from "@/features/shop/hooks";
import { apiFollowShop, apiUnfollowShop } from "@/features/shop/services";
import { getApiErrorMessage } from "@/lib/http/handleAxiosError";
import ShopFollowButton from "./ShopFollowButton";
import ShopViewButton from "./ShopViewButton";

function resolveFollowState(value: unknown): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value === 1;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return ["1", "true", "yes", "followed", "following"].includes(normalized);
  }

  return false;
}

const ShopActions = () => {
  const { t } = useTranslation();
  const signedIn = useAppSelector((state) => state.auth.session.signedIn);
  const { data } = useShopInfoContext();
  const { shop_id, shop_slug } = data || {};
  const initialFollowState = React.useMemo(
    () =>
      resolveFollowState(
        data?.is_following ?? data?.isFollowed ?? data?.is_followed ?? data?.following,
      ),
    [data],
  );

  const [isFollowing, setIsFollowing] = React.useState(initialFollowState);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    setIsFollowing(initialFollowState);
  }, [initialFollowState]);

  const handleToggleFollow = async () => {
    if (!shop_id || isSubmitting) {
      return;
    }

    if (!signedIn) {
      toast.error(t("shop_follow_sign_in"));
      return;
    }

    const previousValue = isFollowing;
    const nextValue = !previousValue;

    setIsFollowing(nextValue);
    setIsSubmitting(true);

    try {
      const response = (await (nextValue ? apiFollowShop(shop_id) : apiUnfollowShop(shop_id))) as {
        data?: { message?: string };
        message?: string;
      };

      toast.success(
        response?.data?.message ||
          response?.message ||
          t(nextValue ? "shop_follow_success" : "shop_unfollow_success"),
      );
    } catch (error: any) {
      setIsFollowing(previousValue);
      toast.error(
        getApiErrorMessage(error, t(nextValue ? "shop_follow_failed" : "shop_unfollow_failed")),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ItemActions className="flex-col gap-2">
      <ShopFollowButton
        isFollowing={isFollowing}
        disabled={isSubmitting}
        onToggleFollow={handleToggleFollow}
      />
      <ShopViewButton slug={shop_slug} id={shop_id} />
    </ItemActions>
  );
};

export default ShopActions;
