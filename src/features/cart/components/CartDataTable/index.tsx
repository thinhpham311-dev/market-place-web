"use client";

import * as React from "react";
import { DataTable } from "@/features/common";
import type { ColumnDef } from "@tanstack/react-table";
import { ICartItemModel } from "@/models/cart";
import { useShoppingCartContext } from "@/features/cart/hooks";

interface ICartDataTableProps {
  cartKey: string;
  cartId: string;
  data: ICartItemModel[];
  initialColumns: ColumnDef<ICartItemModel>[];
}

const CartDataTable = ({
  cartKey = "",
  data = [],
  cartId = "",
  initialColumns,
}: ICartDataTableProps) => {
  const { setItemsSelected } = useShoppingCartContext();

  const handleRowSelectionChange = React.useCallback(
    (selectedItems: ICartItemModel[]) => {
      setItemsSelected(selectedItems);
    },
    [setItemsSelected],
  );

  return (
    <DataTable
      storeKey={`${cartKey}_${cartId}`}
      initialColumns={initialColumns}
      initialData={data}
      onRowSelectionChange={handleRowSelectionChange}
      initialValue={{
        grouping: ["itemShopId"],
        columnVisibility: {
          itemShopId: false,
        },
      }}
    />
  );
};

export default CartDataTable;
