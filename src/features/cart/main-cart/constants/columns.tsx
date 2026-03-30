"use client";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { ICartItemModel } from "@/models/cart";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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

function CartItemCheckboxCell({ item, checked, onCheckedChange }: {
  item: ICartItemModel;
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}) {
  const isDeleting = useIsDeletingItem(item.itemSkuId);

  if (isDeleting) {
    return <Skeleton className="h-5 w-5 rounded-sm" />;
  }

  return (
    <CartItemCheckbox
      data={[item]}
      checked={checked}
      ariaLabel="Select all products"
      onCheckedChange={onCheckedChange}
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

function CartItemNameCell({ item }: { item: ICartItemModel }) {
  const isDeleting = useIsDeletingItem(item.itemSkuId);
  const router = useRouter();

  if (isDeleting) {
    return <Skeleton className="h-5 w-40 rounded-md" />;
  }

  const handleRouterLinkToDetail = () => {
    router.push(`/products/${item.itemSpuSlug}-i.${item.itemShopId}.${item.itemSpuId}`);
  };

  return (
    <Button variant="link" onClick={handleRouterLinkToDetail} className="cursor-pointer px-0">
      <CartItemName itemName={item.itemSpuName} />
    </Button>
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
    return <Skeleton className="h-5 w-20 rounded-md" />;
  }

  return (
    <div className="flex justify-center">
      <CartItemPrice itemPrice={item.itemSkuPrice} />
    </div>
  );
}

function CartItemQuantityCell({ item }: { item: ICartItemModel }) {
  const isDeleting = useIsDeletingItem(item.itemSkuId);

  if (isDeleting) {
    return <Skeleton className="h-9 w-28 rounded-md" />;
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

  return (
    <div className="flex justify-center">
      <CartItemPrice itemPrice={item.itemTotalPrice} />
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

export const initialColumns: ColumnDef<ICartItemModel>[] = [
  {
    id: "select",
    header: ({ table }) => {
      const items = table.getSelectedRowModel().rows.map((r) => r.original as ICartItemModel);
      return (
        <CartItemCheckbox
          data={items}
          checked={table.getIsAllRowsSelected()}
          ariaLabel="Select all products"
          onCheckedChange={(val) => table.toggleAllRowsSelected(val)}
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
    header: () => <p className="text-left">Image</p>,
    cell: ({ row }) => {
      const item = row.original as ICartItemModel;
      return <CartItemImageCell item={item} />;
    },
    size: 64,
  },
  {
    accessorKey: "itemSpuName",
    header: () => <p className="text-left ">Name</p>,
    cell: ({ row }) => {
      const item = row.original as ICartItemModel;
      return <CartItemNameCell item={item} />;
    },
    size: 150,
  },
  {
    accessorKey: "itemSpuVariations",
    header: () => <p className="text-left px-2.5">Variants</p>,
    cell: ({ row }) => {
      const item = row.original as ICartItemModel;
      return <CartItemVariantsCell item={item} />;
    },
    size: 120,
  },
  {
    accessorKey: "itemSkuPrice",
    header: () => <p className="text-center ">Unit</p>,
    cell: ({ row }) => {
      const item = row.original as ICartItemModel;
      return <CartItemUnitPriceCell item={item} />;
    },
    size: 100,
  },
  {
    accessorKey: "itemQuantity",
    header: () => <p className="text-center">Quantity</p>,
    cell: ({ row }) => {
      const item = row.original as ICartItemModel;
      return <CartItemQuantityCell item={item} />;
    },
    size: 150,
  },
  {
    id: "totalPrice",
    header: () => <p className="text-center ">Total</p>,
    cell: ({ row }) => {
      const item = row.original as ICartItemModel;
      return <CartItemTotalPriceCell item={item} />;
    },
    size: 120,
  },
  {
    accessorKey: "actions",
    header: () => <p className="text-right  px-3">Features</p>,
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
