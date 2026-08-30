"use client";
import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { ICartItemModel } from "@/models/cart";
import CartItem from "@/features/cart/components/CartItem";
import { AlertTriangle, Store, ChevronDown } from "lucide-react";
import { useTranslation } from "@/lib/hooks/use-translation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setShopCollapse } from "@/features/cart/store/collapseSlice";

interface ICartListViewProps {
  data: ICartItemModel[];
}

interface IShopGroup {
  shopId: string;
  shopName: string;
  shopSlug?: string;
  items: ICartItemModel[];
}

interface IShopGroupItemProps {
  group: IShopGroup;
}

const ShopGroupItem = ({ group }: IShopGroupItemProps) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state) => state.cartCollapse?.collapsedShops[group.shopId] ?? true,
  );

  const handleOpenChange = (open: boolean) => {
    dispatch(setShopCollapse({ shopId: group.shopId, isOpen: open }));
  };

  return (
    <Collapsible open={isOpen} onOpenChange={handleOpenChange} className="space-y-2">
      {/* Shop Category Header with title and right-aligned arrow (justify-between) */}
      <div className="flex items-center justify-between p-2 rounded-md bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-foreground">
        <div className="flex items-center gap-1.5 truncate">
          <Store className="w-3.5 h-3.5 text-primary shrink-0" />
          {group.shopSlug && group.shopId !== "unknown" ? (
            <Link
              href={`/shop/${group.shopSlug}-s.${group.shopId}`}
              className="hover:underline hover:text-primary transition-colors truncate"
            >
              {group.shopName}
            </Link>
          ) : (
            <span className="truncate">{group.shopName}</span>
          )}
          <span className="text-[11px] font-normal text-muted-foreground">({group.items.length})</span>
        </div>

        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md shrink-0"
            aria-label="Toggle shop section"
          >
            <ChevronDown
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </CollapsibleTrigger>
      </div>

      {/* Shop Items List */}
      <CollapsibleContent className="space-y-2">
        <ul className="space-y-2">
          {group.items.map((item) => (
            <li key={item.itemId || item.itemSkuId}>
              <CartItem data={item} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

const CartListView = ({ data = [] }: ICartListViewProps) => {
  const { t } = useTranslation();

  const shopGroups = React.useMemo(() => {
    const map = new Map<string, IShopGroup>();

    data.forEach((item) => {
      const shopId = item.itemShopId || "unknown";
      const shopName = item.itemShopName || "Shop";
      const shopSlug = item.itemShopSlug;

      if (!map.has(shopId)) {
        map.set(shopId, {
          shopId,
          shopName,
          shopSlug,
          items: [],
        });
      }
      map.get(shopId)!.items.push(item);
    });

    return Array.from(map.values());
  }, [data]);

  if (data.length === 0) {
    return (
      <div
        className={`w-full flex flex-col items-center justify-center aspect-square text-center text-muted-foreground`}
      >
        <AlertTriangle className="w-10 h-10 mb-2 text-yellow-500" />
        <p className="text-sm font-medium">{t("common_no_data_found")}</p>
      </div>
    );
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <ScrollArea className="aspect-square">
          <div className="space-y-4 pr-1">
            {shopGroups.map((group) => (
              <ShopGroupItem key={group.shopId} group={group} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CartListView;
