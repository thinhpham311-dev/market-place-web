"use client";

import React, { useState, useEffect } from "react";
import { TicketPercent, Tag, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { ICartItemModel } from "@/models/cart";
import { IVoucherModel } from "@/models/discount";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatToCurrency } from "@/utils/formats";

interface ICartItemGetVouchersProps {
  data: ICartItemModel;
}

export default function CartItemGetVouchers({ data }: ICartItemGetVouchersProps) {
  const [open, setOpen] = useState(false);
  const [vouchers, setVouchers] = useState<IVoucherModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [appliedVoucherId, setAppliedVoucherId] = useState<string | null>(null);

  const shopId = data.itemShopId;

  // Fallback vouchers for item shop
  const defaultVouchers: IVoucherModel[] = [
    {
      discountId: `voucher_40k_${shopId}`,
      id: `voucher_40k_${shopId}`,
      title: "Voucher Giảm 40k₫",
      description: "Giảm 40.000₫ cho đơn hàng từ 0₫",
      code: `SHOP40K_${shopId}`,
      minSpend: 0,
      discountAmount: 40000,
      discountType: "amount",
      discountValue: 40000,
      maxDiscountAmount: 40000,
      validFrom: new Date().toISOString(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      usageLimit: 100,
      usageCount: 12,
      shopId: shopId,
      status: "available",
    },
    {
      discountId: `voucher_15pct_${shopId}`,
      id: `voucher_15pct_${shopId}`,
      title: "Voucher Giảm 15%",
      description: "Giảm 15% tối đa 50.000₫ cho sản phẩm này",
      code: `SHOP15_${shopId}`,
      minSpend: 150000,
      discountAmount: 25000,
      discountType: "percentage",
      discountValue: 15,
      maxDiscountAmount: 50000,
      validFrom: new Date().toISOString(),
      validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      usageLimit: 50,
      usageCount: 5,
      shopId: shopId,
      status: "available",
    },
  ];

  useEffect(() => {
    if (!open) return;
    const fetchVouchers = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/discount/list", {
          params: { shopId: shopId || "568915" },
        });
        const list = res.data?.metadata || res.data?.data || res.data || [];
        if (Array.isArray(list) && list.length > 0) {
          setVouchers(list);
        } else {
          setVouchers(defaultVouchers);
        }
      } catch {
        setVouchers(defaultVouchers);
      } finally {
        setLoading(false);
      }
    };
    fetchVouchers();
  }, [open, shopId]);

  const handleApplyVoucher = (voucher: IVoucherModel) => {
    if (appliedVoucherId === voucher.discountId) {
      setAppliedVoucherId(null);
      toast.info(`Đã bỏ áp dụng voucher ${voucher.code}`);
    } else {
      setAppliedVoucherId(voucher.discountId);
      toast.success(`Đã áp dụng ${voucher.title} cho sản phẩm`);
      setOpen(false);
    }
  };

  const itemSavings =
    data.itemOriginalPrice && data.itemOriginalPrice > data.itemSkuPrice
      ? data.itemOriginalPrice - data.itemSkuPrice
      : 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/80 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800 transition-colors cursor-pointer"
        >
          <TicketPercent className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>
            {appliedVoucherId
              ? "Voucher đã áp dụng"
              : itemSavings > 0
                ? `Voucher giảm ${formatToCurrency(itemSavings)}`
                : "Voucher giảm đến 40k₫"}
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Sparkles className="w-4 h-4 text-amber-500" />
            Voucher cho {data.itemSpuName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 my-2 max-h-[60vh] overflow-y-auto pr-1">
          {loading ? (
            <p className="text-sm text-center py-4 text-muted-foreground">Đang tải voucher...</p>
          ) : (
            (vouchers.length > 0 ? vouchers : defaultVouchers).map((voucher) => {
              const isApplied = appliedVoucherId === voucher.discountId;
              return (
                <div
                  key={voucher.discountId || voucher.id}
                  className={`flex items-center justify-between p-3 rounded-lg border text-sm transition-all ${
                    isApplied
                      ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/40"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-amber-600" />
                      <strong className="font-semibold">{voucher.title}</strong>
                      <Badge variant="outline" className="text-[10px] uppercase border-amber-300">
                        {voucher.code}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{voucher.description}</p>
                    {voucher.minSpend > 0 && (
                      <p className="text-[11px] text-muted-foreground">
                        Đơn tối thiểu: {formatToCurrency(voucher.minSpend)}
                      </p>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant={isApplied ? "default" : "outline"}
                    className={isApplied ? "bg-amber-600 hover:bg-amber-700 text-white h-8" : "h-8"}
                    onClick={() => handleApplyVoucher(voucher)}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Đã áp dụng
                      </>
                    ) : (
                      "Áp dụng"
                    )}
                  </Button>
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
