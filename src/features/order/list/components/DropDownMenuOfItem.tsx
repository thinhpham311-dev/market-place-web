"use client";

import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { IOrderModel } from "@/models/order";

import { Copy, MoreHorizontal, Receipt } from "lucide-react";

interface IDropDownMenuOfItemProps {
  order: IOrderModel;
}

export default function DropDownMenuOfItem({ order }: IDropDownMenuOfItemProps) {
  const router = useRouter();

  const handleRouterLinkToDetail = () => {
    router.push(`/user/purchase/orders/${order.id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(order.id)}>
          <Copy />
          <span>Copy payment ID</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleRouterLinkToDetail}>
          <Receipt />
          <span>View order detail</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
