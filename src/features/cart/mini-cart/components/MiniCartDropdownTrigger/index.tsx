"use client";

import * as React from "react";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

import LoadingSkeleton from "./LoadingSkeleton";
import { useShoppingCartContext } from "@/features/cart/hooks";

type MiniCartDropdownTriggerProps = React.ComponentPropsWithoutRef<"button">;

const MiniCartDropdownTrigger = React.forwardRef<HTMLButtonElement, MiniCartDropdownTriggerProps>(
  (props, ref) => {
    const { data, loading } = useShoppingCartContext();
    const { cart_items_count = 0 } = data;

    if (loading.actions.showList) {
      return (
        <DropdownMenuTrigger asChild>
          <div>
            <LoadingSkeleton />
          </div>
        </DropdownMenuTrigger>
      );
    }

    return (
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative" ref={ref} {...props}>
          <ShoppingCart />
          {cart_items_count > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 rounded-full min-w-[18px] h-[18px] text-xs flex justify-center items-center text-white px-1">
              {cart_items_count}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
    );
  },
);

MiniCartDropdownTrigger.displayName = "MiniCartDropdownTrigger";
export default MiniCartDropdownTrigger;
