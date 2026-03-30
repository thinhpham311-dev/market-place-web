"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IOrderModel } from "@/models/order";
import { formatDateTime, formatToCurrency } from "@/utils/formats";

import DropDownMenuOfItem from "./DropDownMenuOfItem";

const statusMapping: Record<string, { label: string; color: string }> = {
  inProgress: { label: "In Progress", color: "text-blue-500" },
  tranforming: { label: "TranForming", color: "text-yellow-500" },
  completed: { label: "Completed", color: "text-green-500" },
  cancel: { label: "Cancel", color: "text-red-500" },
};

export const columns: ColumnDef<IOrderModel>[] = [
  {
    accessorKey: "user",
    header: "Full Name",
    cell: ({ row }) => {
      const { user } = row.original;
      return <div className="capitalize">{user?.name}</div>;
    },
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: ({ row }) => (
      <div className="capitalize">{formatToCurrency(row.getValue("totalPrice"))}</div>
    ),
  },
  {
    accessorKey: "shippingPrice",
    header: "Shipping Price",
    cell: ({ row }) => (
      <div className="capitalize">{formatToCurrency(row.getValue("shippingPrice"))}</div>
    ),
  },
  {
    accessorKey: "taxPrice",
    header: "Tax Price",
    cell: ({ row }) => (
      <div className="capitalize">{formatToCurrency(row.getValue("taxPrice"))}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Create At",
    cell: ({ row }) => (
      <div className="capitalize">{formatDateTime(row.getValue("createdAt"))}</div>
    ),
  },
  {
    accessorKey: "deliveredAt",
    header: "Delivered At",
    cell: ({ row }) => (
      <div className="capitalize">{formatDateTime(row.getValue("deliveredAt"))}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusKey = row.getValue<string>("status");
      const statusInfo = statusMapping[statusKey] || { label: "Unknown", color: "text-gray-500" };
      return <div className={`font-bold capitalize ${statusInfo.color}`}>{statusInfo.label}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const order = row.original;
      return <DropDownMenuOfItem order={order} />;
    },
  },
];

export default function OrderItemsListOfUser() {
  return (
    <Card className="w-full p-3 md:p-6">
      <CardHeader className="flex flex-row items-center justify-between py-0">
        <CardTitle>Order History List</CardTitle>
      </CardHeader>
      <CardContent className="rounded-md p-0" />
      <CardFooter className="py-0" />
    </Card>
  );
}
