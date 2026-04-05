"use client";

import { useEffect, useMemo, useState } from "react";

import { apiPostShopDetail } from "@/features/shop/services";
import { useTranslation } from "@/lib/hooks";
import { getApiErrorMessage } from "@/lib/http/handleAxiosError";

export type VoucherShopInfo = {
  shop_id: string;
  shop_name: string;
  shop_email: string;
  shop_phone?: string;
  shop_address?: string;
  shop_slug: string;
};

function normalizeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function mapShopInfo(payload: any): VoucherShopInfo | null {
  const metadata = payload?.metadata || payload?.data?.metadata || payload?.data || payload;

  if (!metadata || typeof metadata !== "object") {
    return null;
  }

  const shopId = normalizeString(metadata.shop_id || metadata.shopId);
  if (!shopId) {
    return null;
  }

  return {
    shop_id: shopId,
    shop_name: normalizeString(metadata.shop_name || metadata.shopName),
    shop_email: normalizeString(metadata.shop_email || metadata.shopEmail),
    shop_phone: normalizeString(metadata.shop_phone || metadata.shopPhone),
    shop_address: normalizeString(metadata.shop_address || metadata.shopAddress),
    shop_slug: normalizeString(metadata.shop_slug || metadata.shopSlug || "shop"),
  };
}

interface UseFetchShopInfoParams {
  shopId?: string;
  enabled?: boolean;
}

export function useFetchShopInfo({ shopId = "", enabled = true }: UseFetchShopInfoParams) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shopInfo, setShopInfo] = useState<VoucherShopInfo | null>(null);

  useEffect(() => {
    if (!enabled || !shopId || shopInfo || loading) {
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    apiPostShopDetail({ shop_id: shopId } as any)
      .then((response) => {
        if (!isMounted) {
          return;
        }

        const resolvedShopInfo = mapShopInfo(response);
        if (!resolvedShopInfo) {
          setError(t("voucher_shop_info_not_found"));
          return;
        }

        setShopInfo(resolvedShopInfo);
      })
      .catch((err: any) => {
        if (isMounted) {
          setError(getApiErrorMessage(err, t("voucher_shop_info_not_found")));
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [enabled, loading, shopId, shopInfo, t]);

  const shopHref = useMemo(() => {
    if (!shopInfo?.shop_id) {
      return undefined;
    }

    return `/shop/${shopInfo.shop_slug || "shop"}-s.${shopInfo.shop_id}`;
  }, [shopInfo]);

  return {
    shopInfo,
    shopHref,
    loading,
    error,
  };
}
