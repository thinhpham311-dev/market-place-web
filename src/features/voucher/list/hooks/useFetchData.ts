"use client";

import { useEffect, useLayoutEffect, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import reducer from "@/features/voucher/list/store";
import { injectReducer, removeReducer } from "@/store";
import { getDiscountList } from "@/features/voucher/list/store/dataSlice";
import { selectVoucherListByStoreKey } from "@/features/voucher/list/store/selectors";
import { DEFAULT_VOUCHER_SHOP_ID, VOUCHER_LIST_KEY } from "@/features/voucher/list/constants";

export type VoucherStatus = "available" | "used" | "expired";

export type VoucherItem = {
  id: string;
  title: string;
  description: string;
  code: string;
  minSpend: number;
  discountAmount: number;
  discountType: "amount" | "percentage";
  discountValue: number;
  maxDiscountAmount: number;
  validFrom: string;
  validUntil: string;
  usageLimit: number;
  usageCount: number;
  shopId: string;
  status: VoucherStatus;
  orderId?: string;
};

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

function resolveStatus(item: Record<string, any>, validUntil: string): VoucherStatus {
  const rawStatus = normalizeString(
    item.status || item.discount_status || item.voucher_status || item.state,
  ).toLowerCase();

  if (rawStatus.includes("used")) {
    return "used";
  }

  if (rawStatus.includes("expired") || rawStatus.includes("inactive")) {
    return "expired";
  }

  if (validUntil) {
    const expiresAt = new Date(validUntil).getTime();
    if (Number.isFinite(expiresAt) && expiresAt < Date.now()) {
      return "expired";
    }
  }

  return "available";
}

function mapVoucherItem(item: Record<string, any>, index: number): VoucherItem {
  const validFrom = normalizeString(
    item.valid_from ||
      item.validFrom ||
      item.start_time ||
      item.startTime ||
      item.start_at ||
      item.starts_at,
  );
  const validUntil = normalizeString(
    item.valid_until ||
      item.validUntil ||
      item.end_time ||
      item.endTime ||
      item.expiredAt ||
      item.expires_at,
  );

  const maxDiscountAmount = normalizeNumber(
    item.max_discount_value || item.maxDiscount || item.max_discount_amount || item.max_amount,
  );
  const discountValue = normalizeNumber(
    item.discount_amount ||
      item.discount_value ||
      item.value ||
      item.amount ||
      item.percent ||
      item.discount_percent,
  );
  const discountTypeRaw = normalizeString(
    item.discount_type || item.type || item.value_type || item.discountType,
  ).toLowerCase();

  return {
    id: normalizeString(item.discount_id || item.id || item._id || item.code || `voucher_${index + 1}`),
    title: normalizeString(
      item.discount_name || item.name || item.title || item.discount_title || item.code || "Voucher",
    ),
    description: normalizeString(
      item.description || item.discount_desc || item.sub_title || item.subtitle || "",
    ),
    code: normalizeString(item.code || item.discount_code || item.voucher_code || ""),
    minSpend: normalizeNumber(
      item.min_order_value || item.minSpend || item.minimumSpend || item.min_order_amount,
    ),
    discountAmount: maxDiscountAmount || discountValue,
    discountType: discountTypeRaw.includes("percent") ? "percentage" : "amount",
    discountValue,
    maxDiscountAmount,
    validFrom,
    validUntil,
    usageLimit: normalizeNumber(item.usage_limit || item.limit || item.total_limit || item.quantity),
    usageCount: normalizeNumber(
      item.used_count || item.usage_count || item.used || item.total_used || item.redeemed_count,
    ),
    shopId: normalizeString(item.shop_id || item.shopId || ""),
    orderId: normalizeString(item.order_id || item.orderId || ""),
    status: resolveStatus(item, validUntil),
  };
}

interface UseVoucherFetchDataParams {
  shopId?: string;
  limit?: number;
  page?: number;
}

export function useFetchData(params: UseVoucherFetchDataParams = {}) {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    injectReducer(VOUCHER_LIST_KEY, reducer);

    return () => {
      removeReducer(VOUCHER_LIST_KEY);
    };
  }, []);

  const { loading, error, data } = useAppSelector(selectVoucherListByStoreKey(VOUCHER_LIST_KEY));

  const shopId = params.shopId || DEFAULT_VOUCHER_SHOP_ID;
  const limit = params.limit ?? 50;
  const page = params.page ?? 1;

  useEffect(() => {
    const promise = dispatch(
      getDiscountList({
        shopId,
        limit,
        page,
      }) as any,
    );

    return () => {
      promise.abort?.();
    };
  }, [dispatch, limit, page, shopId]);

  const vouchers = useMemo(() => resolveList(data).map(mapVoucherItem), [data]);

  return {
    vouchers,
    loading,
    error,
    shopId,
  };
}
