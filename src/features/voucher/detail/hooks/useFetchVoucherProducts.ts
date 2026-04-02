"use client";

import { useEffect, useMemo, useState } from "react";

import { ISpuModel } from "@/models/spu";
import { apiGetVoucherProducts } from "@/features/voucher/detail/services";

function normalizeNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function resolveList(payload: Record<string, any> | null | undefined): Record<string, any>[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const directList = Array.isArray(payload.list) ? payload.list : null;
  const metadataList = Array.isArray(payload.metadata?.list) ? payload.metadata.list : null;
  const dataList = Array.isArray(payload.data?.list) ? payload.data.list : null;
  const nestedMetadataList = Array.isArray(payload.data?.metadata?.list) ? payload.data.metadata.list : null;

  return directList || metadataList || dataList || nestedMetadataList || [];
}

function mapProduct(item: Record<string, any>): ISpuModel {
  const shop =
    typeof item.product_shop === "object" && item.product_shop
      ? item.product_shop
      : {
          shop_id: normalizeString(item.shop_id || item.shopId),
          shop_name: normalizeString(item.shop_name || item.shopName),
          shop_email: normalizeString(item.shop_email || item.shopEmail),
          shop_phone: normalizeString(item.shop_phone || item.shopPhone),
          shop_address: normalizeString(item.shop_address || item.shopAddress),
          shop_slug: normalizeString(item.shop_slug || item.shopSlug || "shop"),
        };

  return {
    product_id: normalizeString(item.product_id || item.id || item._id),
    product_name: normalizeString(item.product_name || item.name || item.title),
    product_shop: {
      shop_id: normalizeString(shop.shop_id),
      shop_name: normalizeString(shop.shop_name),
      shop_email: normalizeString(shop.shop_email),
      shop_phone: normalizeString(shop.shop_phone),
      shop_address: normalizeString(shop.shop_address),
      shop_slug: normalizeString(shop.shop_slug || "shop"),
    },
    product_category: Array.isArray(item.product_category)
      ? item.product_category.map(normalizeString).filter(Boolean)
      : [],
    product_description: normalizeString(item.product_description || item.description),
    product_image: normalizeString(
      item.product_image || item.image || item.product_thumb || item.product_thumbnail,
    ),
    product_price: normalizeNumber(item.product_price || item.price),
    product_slug: normalizeString(item.product_slug || item.slug),
    product_brand: normalizeString(item.product_brand || item.brand || item.brand_name),
    product_variations: Array.isArray(item.product_variations) ? item.product_variations : [],
    product_ratingsAverange: normalizeNumber(
      item.product_ratingsAverange || item.product_ratings_average || item.rating_average,
    ),
  };
}

interface UseFetchVoucherProductsParams {
  code?: string;
  shopId?: string;
  limit?: number;
  page?: number;
}

export function useFetchVoucherProducts({
  code = "",
  shopId = "",
  limit = 12,
  page = 1,
}: UseFetchVoucherProductsParams) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!code) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    apiGetVoucherProducts({ code, shopId, limit, page })
      .then((response) => {
        if (!isMounted) {
          return;
        }

        setData(response);
      })
      .catch((err: any) => {
        if (!isMounted) {
          return;
        }

        setError(err?.message || "Unable to load voucher products.");
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [code, limit, page, shopId]);

  const products = useMemo(() => resolveList(data).map(mapProduct).filter((item) => item.product_id), [data]);

  return {
    products,
    loading,
    error,
  };
}
