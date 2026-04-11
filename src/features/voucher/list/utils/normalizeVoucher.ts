import type { VoucherItem, VoucherStatus } from "@/features/voucher/list/types";

function normalizeNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function resolveVoucherList(
  payload: Record<string, any> | null | undefined,
): Record<string, any>[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const directList = Array.isArray(payload.list) ? payload.list : null;
  const metadataList = Array.isArray(payload.metadata?.list) ? payload.metadata.list : null;
  const dataList = Array.isArray(payload.data?.list) ? payload.data.list : null;
  const nestedMetadataList = Array.isArray(payload.data?.metadata?.list)
    ? payload.data.metadata.list
    : null;

  return directList || metadataList || dataList || nestedMetadataList || [];
}

export function resolveVoucherStatus(item: Record<string, any>, validUntil: string): VoucherStatus {
  const rawStatus = normalizeString(item.discount_status_code).toLowerCase();

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

export function mapVoucherItem(item: Record<string, any>, index: number): VoucherItem {
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
    discountId: normalizeString(item.discount_id || `voucher_${index + 1}`),
    id: normalizeString(item.discount_id || `voucher_${index + 1}`),
    title: normalizeString(item.discount_name || "Voucher"),
    description: normalizeString(item.discount_description),
    code: normalizeString(item.code || item.discount_code || item.voucher_code || ""),
    minSpend: normalizeNumber(item.discount_min_order_value),
    discountAmount: maxDiscountAmount || discountValue,
    discountType: discountTypeRaw.includes("percent") ? "percentage" : "amount",
    discountValue,
    maxDiscountAmount,
    validFrom,
    validUntil,
    usageLimit: normalizeNumber(
      item.usage_limit || item.limit || item.total_limit || item.quantity,
    ),
    usageCount: normalizeNumber(
      item.used_count || item.usage_count || item.used || item.total_used || item.redeemed_count,
    ),
    shopId: normalizeString(item.shop_id || item.shopId || ""),
    orderId: normalizeString(item.order_id || item.orderId || ""),
    status: resolveVoucherStatus(item, validUntil),
  };
}
