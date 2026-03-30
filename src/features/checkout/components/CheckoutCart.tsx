"use client";

import Link from "next/link";

import { Card, CardContent, CardImage } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ICartItemModel } from "@/models/cart";
import { formatToCurrency } from "@/utils/formats";
import { renderVariants } from "@/features/cart/utils/renderVariants";

interface CheckoutCartProps {
  items: ICartItemModel[];
}

export default function CheckoutCart({ items }: CheckoutCartProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Your Items</h2>
          <p className="text-sm text-muted-foreground">
            Review the products included in this order before placing it.
          </p>
        </div>
        <Link href="/cart" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
          Edit cart
        </Link>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.itemSkuId}>
            <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border bg-muted">
                <CardImage
                  src={item.itemSpuImage}
                  alt={item.itemSpuName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <p className="line-clamp-2 font-medium">{item.itemSpuName}</p>
                <div className="flex flex-wrap gap-1">{renderVariants(item.itemSpuVariations, item.itemSkuTierIdx)}</div>
                <p className="text-sm text-muted-foreground">Shop: {item.itemShopName}</p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-sm text-muted-foreground">Qty: {item.itemQuantity}</p>
                <p className="font-semibold">
                  {formatToCurrency(item.itemTotalPrice || item.itemSkuPrice * item.itemQuantity)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center text-sm text-muted-foreground">
            No items selected for checkout.
          </CardContent>
        </Card>
      )}

      {items.length > 0 && <Separator />}
    </div>
  );
}
