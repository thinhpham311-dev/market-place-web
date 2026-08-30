"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { ICartItemModel } from "@/models/cart";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "@/lib/hooks";
import CartItemCheckbox from "@/features/cart/components/CartItem/CartItemCheckbox";
import CartItemPrice from "@/features/cart/components/CartItem/CartItemPrice";
import CartItemName from "@/features/cart/components/CartItem/CartItemName";
import CartItemImage from "@/features/cart/components/CartItem/CartItemImage";
import CartItemRemove from "@/features/cart/components/CartItem/CartItemActions/CartItemRemove";
import { CartItemVariantsDrawer } from "@/features/cart/components/CartItem/CartItemVariantsSelector";
import { CartItemQuantityCounter } from "@/features/cart/components/CartItem/CartItemQuantitySelector";
import { useShoppingCartContext } from "@/features/cart/hooks";

function useIsDeletingItem(itemSkuId: string) {
  const { loading } = useShoppingCartContext();

  return Boolean(loading.byItem[itemSkuId]?.deleteItem);
}

import { Checkbox } from "@/components/ui/checkbox";

function CartItemCheckboxCell({
  item,
  checked,
  onCheckedChange,
}: {
  item: ICartItemModel;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  const isDeleting = useIsDeletingItem(item.itemSkuId);

  if (isDeleting) {
    return <Skeleton className="h-5 w-5 rounded-sm" />;
  }

  return (
    <Checkbox
      checked={checked}
      aria-label="Select item"
      onCheckedChange={(value) => onCheckedChange(Boolean(value))}
    />
  );
}

function CartItemImageCell({ item }: { item: ICartItemModel }) {
  const isDeleting = useIsDeletingItem(item.itemSkuId);

  if (isDeleting) {
    return <Skeleton className="h-16 w-16 rounded-md" />;
  }

  return (
    <div>
      <CartItemImage
        src={item.itemSpuImage}
        className="w-16 h-16 border rounded-md"
        _w={64}
        _h={64}
        alt={item.itemSpuName}
      />
    </div>
  );
}

import CartItemGetVouchers from "@/features/cart/components/CartItem/CartItemGetVouchers";

function CartItemNameCell({ item }: { item: ICartItemModel }) {
  const isDeleting = useIsDeletingItem(item.itemSkuId);

  if (isDeleting) {
    return <Skeleton className="h-5 w-40 rounded-md" />;
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <Button variant="link" className="cursor-pointer px-0 text-left h-auto py-0 whitespace-normal line-clamp-2" asChild>
        <Link href={`/products/${item.itemSpuSlug}-i.${item.itemShopId}.${item.itemSpuId}`}>
          <CartItemName itemName={item.itemSpuName} />
        </Link>
      </Button>
      <CartItemGetVouchers data={item} />
    </div>
  );
}

function CartItemVariantsCell({ item }: { item: ICartItemModel }) {
  const isDeleting = useIsDeletingItem(item.itemSkuId);

  if (isDeleting) {
    return <Skeleton className="h-9 w-full rounded-md" />;
  }

  return <CartItemVariantsDrawer data={item} />;
}

function CartItemUnitPriceCell({ item }: { item: ICartItemModel }) {
  const isDeleting = useIsDeletingItem(item.itemSkuId);

  if (isDeleting) {
    return <Skeleton className="h-5 w-full rounded-md" />;
  }

  return (
    <div className="flex justify-center">
      <CartItemPrice itemPrice={item.itemSkuPrice} originalPrice={item.itemOriginalPrice} />
    </div>
  );
}

function CartItemQuantityCell({ item }: { item: ICartItemModel }) {
  const isDeleting = useIsDeletingItem(item.itemSkuId);

  if (isDeleting) {
    return <Skeleton className="h-9 w-full rounded-md" />;
  }

  return (
    <div className="flex justify-center">
      <CartItemQuantityCounter data={item} />
    </div>
  );
}

function CartItemTotalPriceCell({ item }: { item: ICartItemModel }) {
  const isDeleting = useIsDeletingItem(item.itemSkuId);

  if (isDeleting) {
    return <Skeleton className="h-5 w-24 rounded-md" />;
  }

  const originalTotalPrice = item.itemOriginalPrice
    ? item.itemOriginalPrice * item.itemQuantity
    : undefined;

  return (
    <div className="flex justify-center">
      <CartItemPrice
        itemPrice={item.itemTotalPrice ?? item.itemSkuPrice * item.itemQuantity}
        originalPrice={originalTotalPrice}
      />
    </div>
  );
}

function CartItemActionCell({ item }: { item: ICartItemModel }) {
  const isDeleting = useIsDeletingItem(item.itemSkuId);

  if (isDeleting) {
    return (
      <div className="float-end">
        <Skeleton className="h-6 w-6 rounded-md" />
      </div>
    );
  }

  return (
    <div className="float-end">
      <CartItemRemove data={item} />
    </div>
  );
}

export function useCartTableColumns(): ColumnDef<ICartItemModel>[] {
  const { t } = useTranslation();

  const columns: ColumnDef<ICartItemModel>[] = [
    {
      id: "select",
      header: ({ table }) => {
        const isAllSelected = table.getIsAllRowsSelected();
        const isSomeSelected = table.getIsSomeRowsSelected();
        return (
          <Checkbox
            checked={isAllSelected ? true : isSomeSelected ? "indeterminate" : false}
            aria-label={t("cart_select_all_products")}
            onCheckedChange={(val) => table.toggleAllRowsSelected(Boolean(val))}
          />
        );
      },
      cell: ({ row }) => {
        const item = row.original as ICartItemModel;

        return (
          <CartItemCheckboxCell
            item={item}
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
          />
        );
      },
      enableSorting: false,
      enableHiding: false,
      size: 50,
    },
    {
      accessorKey: "itemSpuImage",
      header: () => <p className="text-left">{t("cart_column_image")}</p>,
      cell: ({ row }) => {
        const item = row.original as ICartItemModel;
        return <CartItemImageCell item={item} />;
      },
      size: 64,
    },
    {
      accessorKey: "itemSpuName",
      header: () => <p className="text-left ">{t("cart_column_name")}</p>,
      cell: ({ row }) => {
        const item = row.original as ICartItemModel;
        return <CartItemNameCell item={item} />;
      },
      size: 150,
    },
    {
      accessorKey: "itemSpuVariations",
      header: () => <p className="text-left px-2.5">{t("cart_column_variants")}</p>,
      cell: ({ row }) => {
        const item = row.original as ICartItemModel;
        return <CartItemVariantsCell item={item} />;
      },
      size: 120,
    },
    {
      accessorKey: "itemSkuPrice",
      header: () => <p className="text-center ">{t("cart_column_unit")}</p>,
      cell: ({ row }) => {
        const item = row.original as ICartItemModel;
        return <CartItemUnitPriceCell item={item} />;
      },
      size: 120,
    },
    {
      accessorKey: "itemQuantity",
      header: () => <p className="text-center">{t("cart_column_quantity")}</p>,
      cell: ({ row }) => {
        const item = row.original as ICartItemModel;
        return <CartItemQuantityCell item={item} />;
      },
      size: 150,
    },
    {
      id: "totalPrice",
      header: () => <p className="text-center ">{t("cart_column_total")}</p>,
      cell: ({ row }) => {
        const item = row.original as ICartItemModel;
        return <CartItemTotalPriceCell item={item} />;
      },
      size: 120,
    },
    {
      accessorKey: "actions",
      header: () => <p className="text-right  px-3">{t("cart_column_features")}</p>,
      cell: ({ row }) => {
        const item = row.original as ICartItemModel;
        return <CartItemActionCell item={item} />;
      },
      size: 120,
    },
    {
      accessorKey: "itemShopId",
      cell: () => {
        return <p>shop Id</p>;
      },
      enableGrouping: true,
      enableHiding: true,
    },
  ];

  return columns;
}
