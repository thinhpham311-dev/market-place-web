"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ICartItemModel } from "@/models/cart";
import CartItem from "@/features/cart/components/CartItem";
import { AlertTriangle } from "lucide-react";
interface ICartListViewProps {
  data: ICartItemModel[];
}

const CartListView = ({ data = [] }: ICartListViewProps) => {
  if (data.length === 0) {
    return (
      <div
        className={`w-full flex flex-col items-center justify-center aspect-square text-center text-muted-foreground`}
      >
        <AlertTriangle className="w-10 h-10 mb-2 text-yellow-500" />
        <p className="text-sm font-medium">No data found.</p>
      </div>
    );
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent className="p-0">
        <ScrollArea className="aspect-square">
          <ul className="space-y-2">
            {data.map((item) => (
              <li key={item.itemId}>
                <CartItem data={item} />
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CartListView;
